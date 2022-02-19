const express = require("express");

// import notes router
const notesRouter = require("./notes");

const app = express();

app.use("/notes", notesRouter);

module.exports = app;