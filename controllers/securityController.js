const db = require('../models');
const SecurityDeposit = db.SecurityDeposit;
const Transaction = db.Transaction;

exports.createSecurityDeposit = async (req, res) => {
    try {
        const { transactionId, amount, status } = req.body;
        console.log("Received transactionId:", transactionId);
        const transaction = await Transaction.findByPk(transactionId);
        if (!transaction) {
            return res.status(400).json({ success: false, message: "Transaction ID does not exist" });
        }
        const securityDeposit = await SecurityDeposit.create({ transactionId, amount, status });
        res.status(201).json({ success: true, data: securityDeposit });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllSecurityDeposits = async (req, res) => {
    try {
        const deposits = await SecurityDeposit.findAll();
        res.status(200).json(deposits);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving security deposits', error });
    }
};

exports.getSecurityDepositById = async (req, res) => {
    try {
        const { id } = req.params;
        const deposit = await SecurityDeposit.findByPk(id);
        if (!deposit) {
            return res.status(404).json({ message: 'Security deposit not found' });
        }
        res.status(200).json(deposit);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving security deposit', error });
    }
};

exports.updateSecurityDeposit = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, status } = req.body;
        const [updated] = await SecurityDeposit.update({ amount, status }, { where: { id } });
        if (!updated) {
            return res.status(404).json({ message: 'Security deposit not found' });
        }
        res.status(200).json({ message: 'Security deposit updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating security deposit', error });
    }
};

exports.deleteSecurityDeposit = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await SecurityDeposit.destroy({ where: { id } });
        if (!deleted) {
            return res.status(404).json({ message: 'Security deposit not found' });
        }
        res.status(200).json({ message: 'Security deposit deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting security deposit', error });
    }
};
