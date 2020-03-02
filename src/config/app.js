const express = require('express');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

// Init App
const app = express();

//Router files
const userRouter = require("../routers/user-router");

// Aiddlewares
app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

app.use("/users", userRouter);

// Error Handler
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status(404);
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app;