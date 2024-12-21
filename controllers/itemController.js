const db = require('../models');
const Item = db.Item;
const Category = db.Category;
const User = db.User;

exports.createItem = async (req, res, next) => {
  const { categoryId, ownerId, name, description, pricePerDay, availability } =
    req.body;

  try {
    const category = await Category.findByPk(categoryId);
    const owner = await User.findByPk(ownerId);

    if (!category) {
      const error = new Error('Category not found');
      error.statusCode = 404;
      return next(error);
    }
    if (!owner) {
      const error = new Error('User not found');
      error.statusCode = 404;
      return next(error);
    }

    const newItem = await Item.create({
      categoryId,
      ownerId,
      name,
      description,
      pricePerDay,
      availability,
    });

    return res
      .status(201)
      .json({ message: 'Item created successfully', item: newItem });
  } catch (error) {
    next(error);
  }
};

exports.getAllItems = async (req, res, next) => {
  try {
    const items = await Item.findAll({
      include: [
        { model: Category, as: 'category', attributes: ['id', 'title'] },
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'username', 'fullName'],
        },
      ],
    });
    return res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

exports.getItemById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const item = await Item.findByPk(id, {
      include: [
        { model: Category, as: 'category', attributes: ['id', 'title'] },
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'username', 'fullName'],
        },
      ],
    });
    if (!item) {
      const error = new Error('Item not found');
      error.statusCode = 404;
      return next(error);
    }
    return res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

exports.updateItem = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, pricePerDay, availability } = req.body;

  try {
    const item = await Item.findByPk(id);
    if (!item) {
      const error = new Error('Item not found');
      error.statusCode = 404;
      return next(error);
    }

    item.name = name || item.name;
    item.description = description || item.description;
    item.pricePerDay = pricePerDay || item.pricePerDay;
    item.availability =
      availability !== undefined ? availability : item.availability;

    await item.save();
    return res.status(200).json({ message: 'Item updated successfully', item });
  } catch (error) {
    next(error);
  }
};

exports.deleteItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    const item = await Item.findByPk(id);
    if (!item) {
      const error = new Error('Item not found');
      error.statusCode = 404;
      return next(error);
    }

    await item.destroy();
    return res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    next(error);
  }
};
