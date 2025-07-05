const AdoptionStatus = require('../models/status.model');

exports.createStatus = async (req, res) => {
  try {
    const { petId, status, notes } = req.body;

    const existingStatus = await AdoptionStatus.findOne({ petId });
    if (existingStatus) {
      return res.status(400).json({ message: 'Status for this pet already exists.' });
    }

    const newStatus = new AdoptionStatus({ petId, status, notes });
    await newStatus.save();

    res.status(201).json(newStatus);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create status', error: error.message });
  }
};
