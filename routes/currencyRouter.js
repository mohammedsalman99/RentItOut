const express = require('express');
const { convertCurrency } = require('../services/currencyService');
const router = express.Router();

router.get('/convert', async (req, res) => {
    const { from, to, amount } = req.query;

    if (!from || !to || !amount) {
        return res.status(400).json({ error: 'Please provide from, to, and amount query parameters' });
    }

    try {
        const convertedAmount = await convertCurrency(from.toUpperCase(), to.toUpperCase(), parseFloat(amount));
        res.status(200).json({ from, to, amount, convertedAmount });
    } catch (error) {
        res.status(500).json({ error: 'Error converting currency' });
    }
});

module.exports = router;
