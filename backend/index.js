const express = require('express');
const cors = require('cors');
const app = express();
// app.use(cors);
const allowedOrigins = ['http://localhost:3000']; // Replace with your frontend's URL
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Enable credentials (cookies, authorization headers)
  })
);
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
