require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db/connect');
const mongoose = require('mongoose')
const convertRoute = require('./routes/convert');
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/', convertRoute);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
  
mongoose.connection.on('error', err => {
  console.log(err)
})
