const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

require('dotenv').config();
const connectToMongo = require('./db');
connectToMongo();
const PORT = process.env.PORT;
app.use(express.json());//middleware to parse json requests

app.use('/api/auth', require('./routes/auth'));

app.use('/api/notes', require('./routes/notes'));

app.listen(PORT, ()=>{
    console.log(`server listening on port ${PORT}`);
});
