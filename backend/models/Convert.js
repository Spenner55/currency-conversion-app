const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema({
  from: String,
  to: String,
  rate: Number,
  lastUpdated: Date
});

// Index to quickly find rates
rateSchema.index({ from: 1, to: 1 }, { unique: true });

module.exports = mongoose.model('Rate', rateSchema);