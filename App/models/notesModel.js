const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content:{
    type: String,
    default:"",
  },

},{
  timestamps:true
});

const NoteModel = mongoose.model('NoteList', NoteSchema);

module.exports = NoteModel;
