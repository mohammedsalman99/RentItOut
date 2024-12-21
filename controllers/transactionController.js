const db = require('../models');
const Transaction = db.Transaction;
const { convertCurrency } = require('../services/currencyService');
const Item = db.Item;
const User = db.User;

exports.createTransaction = async (req, res, next) => {
  const { itemId, renterId, rentalDuration } = req.body;

  try {
    const item = await Item.findByPk(itemId);
    const renter = await User.findByPk(renterId);

    if (!item) {
      const error = new Error('Item not found');
      error.statusCode = 404;
      return next(error);
    }
    if (!renter) {
      const error = new Error('Renter not found');
      error.statusCode = 404;
      return next(error);
    }

    const priceToPay = item.pricePerDay * rentalDuration;

    const newTransaction = await Transaction.create({
      itemId,
      renterId,
      rentalDuration,
  
      pricePerDay: item.pricePerDay,
      priceToPay,
    });

    return res.status(201).json({
      message: 'Transaction created successfully',
      transaction: newTransaction,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
      include: [
        { model: Item, as: 'item', attributes: ['id', 'name', 'description'] },
        {
          model: User,
          as: 'renter',
          attributes: ['id', 'username', 'fullName'],
        },
      ],
    });
    return res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};

exports.getTransactionById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findByPk(id, {
      include: [
        { model: Item, as: 'item', attributes: ['id', 'name', 'description'] },
        {
          model: User,
          as: 'renter',
          attributes: ['id', 'username', 'fullName'],
        },
      ],
    });
    if (!transaction) {
      const error = new Error('Transaction not found');
      error.statusCode = 404;
      return next(error);
    }
    return res.status(200).json(transaction);
  } catch (error) {
    next(error);
  }
};

exports.updateTransaction = async (req, res, next) => {
  const { id } = req.params;
  const { rentalDuration} = req.body;

  try {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      const error = new Error('Transaction not found');
      error.statusCode = 404;
      return next(error);
    }

    transaction.rentalDuration = rentalDuration || transaction.rentalDuration;

    if (rentalDuration) {
      transaction.priceToPay = transaction.pricePerDay * rentalDuration;
    }

    await transaction.save();
    return res
      .status(200)
      .json({ message: 'Transaction updated successfully', transaction });
  } catch (error) {
    next(error);
  }
};

exports.deleteTransaction = async (req, res, next) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      const error = new Error('Transaction not found');
      error.statusCode = 404;
      return next(error);
    }

    await transaction.destroy();
    return res
      .status(200)
      .json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    next(error);
  }
};

exports.getTransactionCostInCurrency = async (req, res, next) => {
  const { id } = req.params;
  const { currency } = req.query; 

  if (!currency) {
    return res.status(400).json({ error: 'Please provide a currency parameter' });
  }

  try {
    const transaction = await Transaction.findByPk(id);

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    const originalPriceToPay = transaction.priceToPay;

    const convertedPriceToPay = await convertCurrency('USD', currency.toUpperCase(), originalPriceToPay);

    return res.status(200).json({
      originalCurrency: 'USD',
      targetCurrency: currency.toUpperCase(),
      originalPriceToPay,
      convertedPriceToPay,
    });
  } catch (error) {
    console.error('Error converting transaction cost:', error.message);
    next(error);
  }
};
