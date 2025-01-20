require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const {logger, logEvents } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./models/connect');
const mongoose = require('mongoose');
const corsOptions = require('./config/corsOptions');
const convertRoute = require('./routes/convertRoute');
const PORT = process.env.PORT || 5000;

app.use(logger);
app.use(errorHandler);

app.use(cors(corsOptions));
app.use(express.json());

app.use('/', convertRoute);

const startServer= async () => {
  await connectDB();

  mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
    
  mongoose.connection.on('error', err => {
    console.log(err);
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
  });
}

startServer();


