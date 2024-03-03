const express = require('express');
const router = express.Router();
const { deleteNote } = require('../controllers/Notes/deleteNote');
const { editNote } = require('../controllers/Notes/editNote');
const {addNote} = require('../controllers/Notes/addNote');
const {getNotes} = require('../controllers/Notes/getNotes');
const isAuthenticated = require('../middleware/isAuthenticated');

router.post('/addNote',isAuthenticated,addNote);
router.get('/getNotes',isAuthenticated,getNotes);
router.delete('/deleteNote/:noteId',isAuthenticated,deleteNote);
router.post('/editNote/:noteId',isAuthenticated,editNote);

module.exports = router;