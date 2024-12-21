const express = require('express');
const transactionController = require('../controllers/transactionController');
const router = express.Router();

router.post('/', transactionController.createTransaction);
router.get('/', transactionController.getAllTransactions);
router.get('/:id', transactionController.getTransactionById);
router.put('/:id', transactionController.updateTransaction);
router.delete('/:id', transactionController.deleteTransaction);
// New endpoint to get the transaction cost in a different currency
router.get('/:id/convert-cost', transactionController.getTransactionCostInCurrency);


module.exports = router;
