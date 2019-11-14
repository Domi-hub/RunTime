const express               = require('express');
const app                   = express();
const compression           = require("compression");
const cookieSession         = require("cookie-session");
const { hash, compare }     = require("./bcrypt");
const csurf                 = require("csurf");
const s3                    = require("./s3");
const { s3Url }             = require("./config");
const uidSafe               = require("uid-safe");
const multer                = require("multer");
const path                  = require("path");
const db                    = require("./db");

//Middlewares
const diskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, __dirname + "/uploads");
    },
    filename: (req, file, callback) => {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

uidSafe(24);

app.use(compression()); 

app.use(express.static("./public"));
app.use(express.json());

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);

app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(csurf());

app.use((req, res, next) => {
    res.cookie("mytoken", req.csrfToken());
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

//Routes:
app.get(["/login", "/register"], (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/api/register", (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    hash(password).then(hash => {
        db.addRegisteredUser(firstName, lastName, email, hash)
            .then(result => {
                const user = result.rows[0];
                req.session.userId = user.id;
                res.json("/");
            })
            .catch(err => {
                console.log(err);
                res.json("/register", { error: true });
            });
    });
});

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    db.getUserByEmail(email)
        .then(result => {
            const user = result.rows[0];
            return compare(password, user.password).then(isValid => {
                if (isValid) {
                    req.session.userId = user.id;
                    res.json("/");
                } else {
                    res.json("/login", { error: true });
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.get("/api/profile", (req, res) => {
    const userId = req.session.userId;

    db.getUserPrimaryInfo(userId)
        .then(result => res.json(result.rows[0]))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.post("/api/profile", (req, res) => {
    const userId = req.session.userId;
    const {
        firstName, 
        lastName,
        email, 
        password,
        address, 
        postcode,
        city, 
        country } = req.body;
        
    db.updateUserPrimaryInfo(firstName, lastName, email, userId)
        .then(() => {
            if (password) {
                return hash(password).then(hash => {
                    db.updateUserPassword(hash, userId);
                });
            }
        })
        .then(db.upsertUserAdditionalInfo(address, postcode, city, country, userId))
        .then(res.json("/"))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.get("/api/events", (req, res) => {
    const userId = req.session.userId;

    db.getEvents(userId)
        .then(result => {
            const organizedEvents       = result.rows.filter((event) => event.organizer_id == userId)
            const participatingEvents   = result.rows.filter((event) => event.organizer_id != userId)
            res.json({
                events: {
                    organized: organizedEvents,
                    participating: participatingEvents
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.get("/api/map", (req, res) => {
    db.getMapEvents()
        .then(result => res.json({
            events: result.rows
        }))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.post("/api/image", uploader.single("image"), s3.upload, (req, res) => {
    const imageUrl = `${s3Url}${req.file.filename}`;
    const userId = req.session.userId;

    db.updateImage(imageUrl, userId)
        .then(() => res.json({
            imageUrl: imageUrl
        }))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.post("/api/event", (req, res) => {
    const userId = req.session.userId;
    const {
        latitude,
        longitude,
        name, 
        description,
        date, 
        time } = req.body;

    db.addEvent(latitude, longitude, name, description, date, time, userId)
        .then((result) => db.addParticipant(result.rows[0].id, userId))
        .then((result) => res.json(result.rows[0]))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.post("/api/event/:id", (req, res) => {
    const userId = req.session.userId;
    const eventId = req.params.id;

    db.addParticipant(eventId, userId)
        .then(() => res.json("/"))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.delete("/api/event/:id", (req, res) => {
    const userId = req.session.userId;
    const eventId = req.params.id;

    db.deleteParticipants(eventId)
        .then(() => db.deleteEvent(eventId, userId))
        .then(() => res.json("/events"))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.delete("/api/participation/:id", (req, res) => {
    const userId = req.session.userId;
    const eventId = req.params.id;

    db.deleteParticipant(eventId, userId)
        .then(() => res.json("/events"))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/login");
});

//DO NOT DELETE - matches all urls
app.get("*", (req, res) => {
    if (!req.session.userId) {
        res.redirect("/login");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});
//DO NOT DELETE

app.listen(8080, () => {
    console.log("I'm running...");
});