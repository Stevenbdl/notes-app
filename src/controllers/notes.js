const controller = {};

//notes model
const Note = require('../models/note');

controller.addNoteGET = (req, res) => {
  res.render('addnote', { pageTitle : 'Notes App - Add note' });
}
//GETS
controller.getAllNotes = (req, res) => {
  const data = { pageTitle : 'Notes App - Notes' };
  Note.find({ id : req.session.user._id }, (err, notes) => {
    if(err) throw err;
    data.notes = notes;
    res.render('notes', data);
  });
}
//POSTS
controller.addNotePOST = (req, res) => {
  const { title, content } = req.body;
  const id = req.session.user._id;
  const newNote = new Note({
    id : id,
    title : title,
    content : content
  });
  newNote.save((err) => {
    if(err) throw err;
    req.flash('success_msg', 'New note added!');
    res.redirect('/notes');
  });
  //res.redirect('/profile');
}
controller.deleteNote = async (req, res) => {
  const { id } = req.body;
  //console.log(id);
  await Note.deleteOne({ _id : id });
  res.redirect('/notes');
}

controller.editNoteGET = (req, res) => {
  res.render('editnote', { pageTitle : 'Notes App - Edit Note' });
}

controller.editNotePOST = async (req, res) => {
  const { id, title, content } = req.body;
  if(!title && !content) {
    /*If not title or content is because the client send for edit a note
      so server render to user edit form with data of the note to be edit.
    */
    const data = { pageTitle : 'Notes App - Edit Note' };
    //Find the note with id and get title and content then send to client
    Note.findOne({ _id : id }, (err, note) => {
      if(err) throw err;
      data.note = note;
      res.render('editnote', data);
    });
  }else {
    //update or save note
    await Note.findOneAndUpdate({ _id : id }, { title : title, content : content });
    req.flash('success_msg', 'Note updated');
    res.redirect('/notes');
  }
}
module.exports = controller;