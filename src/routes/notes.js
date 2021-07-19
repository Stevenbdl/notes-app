const router = require('express').Router();

//restrict functions from user controllers
const { isAuthenticated } = require('../controllers/user');
//Controller
const notesController = require('../controllers/notes');

//GETS
router.get('/notes', isAuthenticated, notesController.getAllNotes);
router.get('/add_note', isAuthenticated, notesController.addNoteGET);
router.get('/edit_note', isAuthenticated, notesController.editNoteGET);

//POSTS
router.post('/add_note', isAuthenticated, notesController.addNotePOST);
router.post('/delete_note', isAuthenticated, notesController.deleteNote);
router.post('/edit_note', isAuthenticated, notesController.editNotePOST);

module.exports = router;