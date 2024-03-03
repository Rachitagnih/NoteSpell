const Notes = require('../../models/Notes');
const User = require('../../models/User');

module.exports.deleteNote = async (req, res, next) => {
    const noteId = req.params.noteId; // Assuming the noteId is in the request parameters
    try {
        const deletedNote = await Notes.findByIdAndDelete(noteId);
        // console.log(deletedNote);
        if (!deletedNote) {
            return res.status(404).send("Note not found");
        }

        // Remove the note reference from the user
        const userId = req.body.id.user.id; // Assuming the userId is in the request body
        const user = await User.findById(userId);
        user.note.pull(noteId);
        await user.save();
        res.send(deletedNote);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
    next();
};