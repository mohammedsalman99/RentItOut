const express = require('express');
const router = express.Router();
const securityController = require('../controllers/securityController');
router.post('/', securityController.createSecurityDeposit);
router.get('/', securityController.getAllSecurityDeposits);
router.get('/:id', securityController.getSecurityDepositById);
router.put('/:id', securityController.updateSecurityDeposit);
router.delete('/:id', securityController.deleteSecurityDeposit);

module.exports = router;
