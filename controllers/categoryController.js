const db = require('../models');
const Category = db.Category;

exports.addCategory = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const newCategory = await Category.create({ title, description });
    return res.status(201).json(newCategory);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error creating category', error: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.status(200).json(categories);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error fetching categories', error: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.status(200).json(category);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error fetching category', error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.title = title || category.title;
    category.description = description || category.description;

    await category.save();
    return res
      .status(200)
      .json({ message: 'Category updated successfully', category });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error updating category', error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await category.destroy();
    return res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error deleting category', error: error.message });
  }
};
