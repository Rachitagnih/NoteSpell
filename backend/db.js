const mongoose = require('mongoose');
const connectToMongo = ()=>{
    mongoose.connect(process.env.uri)
    .then((data) => console.log("connected to mongo"))
    .catch((err) => console.log(err));
}

module.exports = connectToMongo;
