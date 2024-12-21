const express = require('express');
const router = express.Router();
const deliveryOptionController = require('../controllers/deliveryOptionController'); 


router.post('/', deliveryOptionController.createDeliveryOption);
router.get('/', deliveryOptionController.getAllDeliveryOptions);
router.get('/:id', deliveryOptionController.getDeliveryOptionById);
router.put('/:id', deliveryOptionController.updateDeliveryOption);
router.delete('/:id', deliveryOptionController.deleteDeliveryOption);

module.exports = router;
