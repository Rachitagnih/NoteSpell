const Notes = require('../../models/Notes');
const User = require('../../models/User');
module.exports.addNote= async (req, res, next) => {
    const user = await User.findById(req.body.id.user.id);
    const newNote =  await Notes.create({
        title: req.body.title,
        description: req.body.description
    })
    user.note.push(newNote._id);
    await user.save();
    // console.log(user.note);
    res.send(newNote);
    next();
    // console.log(user)
};