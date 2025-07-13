const NoteModel = require("../models/notesModel");


// create note controller
const createNote = async (req, res) => {
    try {
        const { title } = req.body;
        const note = await NoteModel.create({ title, content: "" });
        res.status(201).json(note);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Notes ko Update Krne ke 
const getNote = async (req, res) => {
    try {
        const note = await NoteModel.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.json(note);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getNoteall = async (req, res) => {
    try {
        const note = await NoteModel.find();
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.json(note);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// update krne liye notes ko

const updateNote = async (req, res) => {
  try {
    const note = await NoteModel.findByIdAndUpdate(
      req.params.id,
      { content: req.body.content, updatedAt: new Date() },
      { new: true }
    );
    res.json(note);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const deletedNote = await NoteModel.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};



module.exports = {
    createNote,
    getNote,
    updateNote,
    getNoteall,
    deleteNote
}