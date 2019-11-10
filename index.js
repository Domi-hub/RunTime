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

app.post("/register", (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    hash(password).then(hash => {
        db.addRegisteredUser(firstName, lastName, email, hash)
            .then(result => {
                const user = result.rows[0];
                req.session.userId = user.id;
                res.json("/welcome");
            })
            .catch(err => {
                console.log(err);
                res.json("/register", { error: true });
            });
    });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.getUserByEmail(email)
        .then(result => {
            const user = result.rows[0];
            return compare(password, user.password).then(isValid => {
                if (isValid) {
                    req.session.userId = user.id;
                    res.json("/welcome");
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

app.get("/profile", (req, res) => {
    const userId = req.session.userId;

    db.getUserPrimaryInfo(userId)
        .then(result => {
            res.json(result.rows[0])
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.post("/profile", (req, res) => {
    const userId= req.sesssion.userId;
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
        .then(res.redirect("/"))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
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