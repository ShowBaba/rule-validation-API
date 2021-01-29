const express = require("express");
const path = require("path");
const createError = require("http-errors");
const logger = require("morgan");
var bodyParser = require('body-parser')
const cors = require("cors");

const validateRouter = require('../api/routes/validate.route');

const app = express();
const corsOptions = {
  origin: "*",
};

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.json({
    message: "My Rule-Validation API",
    status: "success",
    data: {
      name: "Shoyemi Samuel",
      github: "@ShowBaba",
      email: "samwise858@gmail.com",
      mobile: "08168135297",
      twitter: "@samshandle_",
    },
  });
});

app.use('/validate-rule', validateRouter)

app.use("*", (req, res) => {
  res.redirect("/");
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
