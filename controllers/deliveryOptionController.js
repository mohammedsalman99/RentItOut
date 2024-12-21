const db = require('../models');
const DeliveryOption = db.DeliveryOption;

exports.createDeliveryOption = async (req, res, next) => {
  const { type, fee, estimatedTime, description } = req.body;

  try {
    const newOption = await DeliveryOption.create({ type, fee, estimatedTime, description });
    return res.status(201).json({ message: 'Delivery option created successfully', option: newOption });
  } catch (error) {
    next(error);
  }
};

exports.getAllDeliveryOptions = async (req, res, next) => {
  try {
    const options = await DeliveryOption.findAll();
    return res.status(200).json(options);
  } catch (error) {
    next(error);
  }
};

exports.getDeliveryOptionById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const option = await DeliveryOption.findByPk(id);
    if (!option) {
      const error = new Error('Delivery option not found');
      error.statusCode = 404;
      return next(error);
    }
    return res.status(200).json(option);
  } catch (error) {
    next(error);
  }
};

exports.updateDeliveryOption = async (req, res, next) => {
  const { id } = req.params;
  const { type, fee, estimatedTime, description } = req.body;

  try {
    const option = await DeliveryOption.findByPk(id);
    if (!option) {
      const error = new Error('Delivery option not found');
      error.statusCode = 404;
      return next(error);
    }

    await option.update({ type, fee, estimatedTime, description });
    return res.status(200).json({ message: 'Delivery option updated successfully', option });
  } catch (error) {
    next(error);
  }
};

exports.deleteDeliveryOption = async (req, res, next) => {
  const { id } = req.params;

  try {
    const option = await DeliveryOption.findByPk(id);
    if (!option) {
      const error = new Error('Delivery option not found');
      error.statusCode = 404;
      return next(error);
    }

    await option.destroy();
    return res.status(200).json({ message: 'Delivery option deleted successfully' });
  } catch (error) {
    next(error);
  }
};



