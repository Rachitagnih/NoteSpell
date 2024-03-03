const mongoose = require('mongoose');
const Notes = require('./Notes');
const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    password:{
        type: String,
        required : true
    },
    date:{
        type:Date,
        default: Date.now
    },
    note:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Notes'
    }]
})
module.exports = mongoose.model('User', UserSchema);