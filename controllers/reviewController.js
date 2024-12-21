const db = require('../models');
const Review = db.Review;
const User = db.User;
const Item = db.Item;

exports.createReview = async (req, res) => {
  const { itemId, renterId, rating, comment } = req.body;

  try {
    const [item, user] = await Promise.all([
      Item.findByPk(itemId),
      User.findByPk(renterId),
    ]);

    if (!item || !user) {
      return res.status(404).json({ message: 'Item or user not found' });
    }

    const newReview = await Review.create({ itemId, renterId, rating, comment });
    return res.status(201).json({ message: 'Review created successfully', review: newReview });
  } catch (error) {
    console.error("Error creating review:", error.message);
    return res.status(500).json({ message: 'Error creating review', error: error.message });
  }
};

exports.getReviewsByItemId = async (req, res) => {
  try {
    const reviews = await Review.findAll({ where: { itemId: req.params.itemId } });
    if (!reviews.length) {
      return res.status(404).json({ message: 'No reviews found for this item' });
    }
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
};

exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    return res.status(200).json(review);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching review', error: error.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    review.rating = req.body.rating ?? review.rating;
    review.comment = req.body.comment ?? review.comment;

    await review.save();
    return res.status(200).json({ message: 'Review updated successfully', review });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating review', error: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    await review.destroy();
    return res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting review', error: error.message });
  }
};
