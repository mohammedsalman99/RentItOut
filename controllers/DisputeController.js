const { Dispute } = require('../models');
module.exports = {
  async create(req, res) {
    try {
      const { userId, itemId, type, description } = req.body;
      const dispute = await Dispute.create({ userId, itemId, type, description });
      return res.status(201).json(dispute);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  async getAll(req, res) {
    try {
      const disputes = await Dispute.findAll({ include: ['user', 'item'] });
      return res.status(200).json(disputes);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  
  async getById(req, res) {
    try {
      const { id } = req.params;
      const dispute = await Dispute.findByPk(id, { include: ['user', 'item'] });
      if (!dispute) return res.status(404).json({ error: 'Dispute not found' });
      return res.status(200).json(dispute);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

 
  async update(req, res) {
    try {
      const { id } = req.params;
      const { type, description } = req.body;
      const dispute = await Dispute.findByPk(id);
      if (!dispute) return res.status(404).json({ error: 'Dispute not found' });

      dispute.type = type || dispute.type;
      dispute.description = description || dispute.description;
      await dispute.save();

      return res.status(200).json(dispute);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

 
  async delete(req, res) {
    try {
      const { id } = req.params;
      const dispute = await Dispute.findByPk(id);
      if (!dispute) return res.status(404).json({ error: 'Dispute not found' });

      await dispute.destroy();
      return res.status(200).json({ message: 'Dispute deleted' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};



