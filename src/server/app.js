const express = require("express");
const path = require("path");
const createError = require("http-errors");
const logger = require("morgan");
var bodyParser = require("body-parser");
const cors = require("cors");

// routes
const validateRouter = require("../api/routes/validate.route");

const app = express();
const corsOptions = {
  origin: "*",
};

app.use(logger("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    message: "My Rule-Validation API",
    status: "success",
    data: {
      name: "Shoyemi Samuel Segun",
      github: "@ShowBaba",
      email: "samwise858@gmail.com",
      mobile: "08168135297",
      twitter: "@samshandle_",
    },
  });
});

app.use("/validate-rule", validateRouter);

app.use("*", (req, res) => {
  res.status(301).redirect("/");
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use((error, req, res, next) => {
  return res.status(500).json({
    message: "Invalid JSON payload passed.",
    status: "error",
    data: null,
  });
});

module.exports = app;
