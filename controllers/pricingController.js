const Pricing = require('../models/Pricing');

// Get all pricing plans
exports.getAllPricingPlans = async (req, res) => {
  try {
    const pricingPlans = await Pricing.find();
    res.status(200).json({
      success: true,
      data: pricingPlans
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching pricing plans",
      error: error.message
    });
  }
};

// Get single pricing plan by ID
exports.getPricingPlanById = async (req, res) => {
  try {
    const plan = await Pricing.findOne({ id: req.params.id });
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Pricing plan not found"
      });
    }
    res.status(200).json({
      success: true,
      data: plan
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching pricing plan",
      error: error.message
    });
  }
};

// Create new pricing plan
exports.createPricingPlan = async (req, res) => {
  try {
    const newPlan = await Pricing.create(req.body);
    res.status(201).json({
      success: true,
      data: newPlan
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating pricing plan",
      error: error.message
    });
  }
};