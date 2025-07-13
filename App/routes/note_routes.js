const express = require('express');

const {
  createNote,
  getNote,
  updateNote,
  getNoteall,
  
} = require("../controllers/noteController");

const UserNotes = express.Router();

UserNotes.post("/notes", createNote);
UserNotes.get("/getnotes/all", getNoteall);
UserNotes.get("/getnotes/:id", getNote);
UserNotes.put("/updatenotes/:id", updateNote);


module.exports = UserNotes;
    
