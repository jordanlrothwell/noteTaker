const notes = require("express").Router();
const { json } = require("express/lib/response");
const { readFromFile, readAndAppend, writeToFile } = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");

// GET route for retrieving all the notes
notes.get("/", (req, res) => {
  readFromFile("./db/notes.json").then((data) => res.json(JSON.parse(data)));
});

// POST route for new note
notes.post("/", (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, "./db/notes.json");
    res.json(`Notes added successfully 🚀`);
  } else {
    res.error("Error in adding note");
  }
});

notes.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const notesJSON = await readFromFile("./db/notes.json");
  const notesArr = JSON.parse(notesJSON);
  const updatedArr = notesArr.filter(function (obj) {
    return obj.id !== id;
  });
  writeToFile("./db/notes.json", updatedArr);
  res.json(`Note id: ${id} deleted successfully 🚀`);
});

module.exports = notes;
