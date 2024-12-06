const express = require('express');
const router = express.Router();
const axios = require('axios');
const Rate = require('../db/rateModel');

const STALE_THRESHOLD = 60 * 60 * 1000; // 1 hours in ms

router.get('/convert', async (req, res) => {
  const { amount, from, to } = req.query;
  if (!amount || !from || !to) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  const fromCurrency = from.toUpperCase();
  const toCurrency = to.toUpperCase();

  try {
    // 1. Check if rate is in DB and not stale
    let rateDoc = await Rate.findOne({ from: fromCurrency, to: toCurrency });
    let rate;
    
    const now = new Date();
    let needsUpdate = true;
    if (rateDoc) {
      const age = now - rateDoc.lastUpdated;
      if (age < STALE_THRESHOLD) {
        // Use cached rate
        rate = rateDoc.rate;
        needsUpdate = false;
      }
    }

    // 2. If not found or stale, fetch new rate from API
    if (needsUpdate) {
      const url = `https://api.frankfurter.app/latest?from=${fromCurrency}&to=${toCurrency}`;
      const response = await axios.get(url);
      rate = response.data.rates[toCurrency];
      
      // Upsert the rate in the DB
      if (rateDoc) {
        rateDoc.rate = rate;
        rateDoc.lastUpdated = now;
        await rateDoc.save();
      } else {
        await Rate.create({ from: fromCurrency, to: toCurrency, rate, lastUpdated: now });
      }
    }

    // 3. Calculate converted amount
    const converted = parseFloat(amount) * rate;
    res.json({ amount: parseFloat(amount), from: fromCurrency, to: toCurrency, converted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
