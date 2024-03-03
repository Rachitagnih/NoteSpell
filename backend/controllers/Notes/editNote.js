const Notes = require('../../models/Notes');

module.exports.editNote = async (req, res, next) => {
    const noteId = req.params.noteId; // Assuming the noteId is in the request parameters
    try {
        const updatedNote = await Notes.findByIdAndUpdate(
            noteId,
            {
                title: req.body.title,
                description: req.body.description,
            },
            { new: true }
        );
        // console.log(noteId, updatedNote);
        if (!updatedNote) {
            return res.status(404).send("Note not found");
        }

        res.send(updatedNote);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
    next();
};