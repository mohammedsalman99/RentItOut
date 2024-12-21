const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/', reviewController.createReview);

router.get('/item/:itemId', reviewController.getReviewsByItemId);

router.get('/review/:id', reviewController.getReviewById);

router.put('/:id', reviewController.updateReview);

router.delete('/:id', reviewController.deleteReview);

module.exports = router;
