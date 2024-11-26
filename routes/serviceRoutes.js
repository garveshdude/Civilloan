const express = require('express');
const Service = require('../models/service');
const router = express.Router();

const CustomError = require('../middleware/CustomError');


router.get('/allservices', async (req, res, next) => {
  try {
    const services = await Service.find();
    if (!services) {
      throw new CustomError('Services not found', 404);
    }
    res.json(services);
  } catch (err) {
    next(err); 
  }
});


router.get('/allservices', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/service/:type', async (req, res) => {
  try {
    const service = await Service.findOne({ type: req.params.type });
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
