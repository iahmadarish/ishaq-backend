const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  price: {
    monthly: {
      type: String,
      required: true
    },
    yearly: {
      type: String, 
      required: true
    }
  },
  features: [{
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Pricing', pricingSchema);