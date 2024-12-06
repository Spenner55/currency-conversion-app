const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connect');
const convertRoute = require('./routes/convert');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', convertRoute);

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB(process.env.MONGO_URI || "mongodb://localhost:27017/currency_cache");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
