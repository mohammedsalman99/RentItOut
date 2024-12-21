
const express = require('express');
const router = express.Router();
const disputeController = require('../controllers/DisputeController');
router.post('/', disputeController.create);
router.get('/', disputeController.getAll);
router.get('/:id', disputeController.getById);
router.put('/:id', disputeController.update);
router.delete('/:id', disputeController.delete);

module.exports = router;
