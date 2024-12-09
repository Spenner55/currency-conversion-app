const Convert = require('../models/Convert');
const asyncHandler = require('express-async-handler');
const axios = require('axios');

const STALE_THRESHOLD = 60 * 60 * 1000; // 1 hour in ms

const convertCurrency = async (req, res) => {
  const { amount, from, to } = req.query;
  if (!amount || !from || !to) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  const fromCurrency = from.toUpperCase();
  const toCurrency = to.toUpperCase();
  try {
    let rateDoc = await Convert.findOne({ from: fromCurrency, to: toCurrency });
    let rate;
    
    const now = new Date();
    let needsUpdate = true;

    if (rateDoc) {
      const age = now - rateDoc.lastUpdated;
      if (age < STALE_THRESHOLD) {
        rate = rateDoc.rate;
        needsUpdate = false;
      }
    }

    if (needsUpdate) {
      const url = `https://api.frankfurter.app/latest?from=${fromCurrency}&to=${toCurrency}`;
      const response = await axios.get(url);
      rate = response.data.rates[toCurrency];

      if (rateDoc) {
        rateDoc.rate = rate;
        rateDoc.lastUpdated = now;
        await rateDoc.save();
      } else {
        await Convert.create({ from: fromCurrency, to: toCurrency, rate, lastUpdated: now });
      }
    }

    const converted = parseFloat(amount) * rate;
    res.json({ amount: parseFloat(amount), from: fromCurrency, to: toCurrency, converted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getRate = asyncHandler(async (req, res) => {
    const rate = await Convert.findOne({ from: fromCurrency, to: toCurrency });

    if(!notes?.length) {
        return res.status(400).json({message: 'Note conversion rate found'});
    }

    res.json(rate);
})

const newRate = asyncHandler(async (req, res) => {

})

const updateRate = asyncHandler(async (req, res) => {

})

module.exports = { convertCurrency };