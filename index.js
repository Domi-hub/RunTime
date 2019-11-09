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

app.use(
    express.urlencoded({
        extended: false
    })
);

//Routes:


app.listen(8080, () => {
    console.log("I'm running...");
});