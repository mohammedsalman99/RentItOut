require('dotenv').config();
const axios = require('axios');

const apiKey = process.env.EXCHANGE_RATE_API_KEY;
const baseUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;


/**
 * Convert currency from one type to another
 * @param {string} fromCurrency - The currency code you want to convert from (e.g., 'USD')
 * @param {string} toCurrency - The currency code you want to convert to (e.g., 'EUR')
 * @param {number} amount - The amount to convert
 * @returns {Promise<number>} - The converted amount
 */
async function convertCurrency(fromCurrency, toCurrency, amount) {
  try {
    const response = await axios.get(`${baseUrl}${fromCurrency}`);
    
    if (response.status !== 200) {
      throw new Error('Failed to fetch exchange rate');
    }

    const rates = response.data.conversion_rates;
    const conversionRate = rates[toCurrency];

    if (!conversionRate) {
      throw new Error('Invalid currency code');
    }
    return parseFloat((amount * conversionRate).toFixed(2));
  } catch (error) {
    console.error('Error fetching exchange rate:', error.message);
    throw new Error('Unable to perform currency conversion at this time. Please try again later.');
  }
}


module.exports = { convertCurrency };
