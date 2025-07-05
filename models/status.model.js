const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  petId: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['not_adopted', 'reserved', 'adopted'],
    default: 'not_adopted'
  },
  notes: {
    type: String
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AdoptionStatus', statusSchema);
