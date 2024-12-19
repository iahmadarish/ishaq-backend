const express = require('express');
const router = express.Router();
const { 
  getAllPricingPlans,
  getPricingPlanById,
  createPricingPlan
} = require('../controllers/pricingController');

// Get all pricing plans
router.get('/plans', getAllPricingPlans);

// Get single plan
router.get('/plans/:id', getPricingPlanById);

// Create new plan
router.post('/plans', createPricingPlan);

module.exports = router;