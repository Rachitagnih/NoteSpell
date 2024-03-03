const User = require('../../models/User');
const Notes = require('../../models/Notes');
module.exports.getNotes = async (req, res, next) => {
    const data = await User.findById(req.body.id.user.id);
    const notes = data.note;
    // console.log(notes)
    const result=[];
    
    for( let i = 0; i < notes.length; i++ )
    {
        const a= await Notes.findById(notes[i]);
        result.push(a);
    }
    
    res.send(result);
    next();
}