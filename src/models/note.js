const mongoose = require('mongoose');
const { Schema, model } = mongoose;

//ID -> The id of the user that make this note
const noteSchema = new Schema({
  id : String,
  title : String,
  content : String
});


module.exports = model('notes', noteSchema);