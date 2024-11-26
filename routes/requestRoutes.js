const express = require('express');
const Request = require('../models/request');
const router = express.Router();


router.post('/service/:type/form', async (req, res) => {
  const { mobile, email, amt, type, msg, code } = req.body;
  try {
    const newRequest = new Request({ mobile, email, amt, type, msg, code });
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put('/updaterequest', async (req, res) => {
  const { mobile, service, type, remarks } = req.body;
  try {
    const updatedRequest = await Request.findOneAndUpdate(
      { mobile, type },
      { msg: remarks, code: service },
      { new: true }
    );
    if (!updatedRequest) return res.status(404).json({ message: 'Request not found' });
    res.json(updatedRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/service/:type/calculate', (req, res) => {
    const { amt, tenure, type } = req.body;

    if (!amt || !tenure) {
        return res.status(400).json({ message: 'Amount and tenure are required' });
    }

    const rate = 10; // Assume 10% annual interest rate
    const monthlyRate = rate / 12 / 100;
    const emi = (amt * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1);

    res.json({ emi: emi.toFixed(2) });
});



router.delete('/deleterequest', async (req, res) => {
  const { mobile } = req.body;
  try {
    const deletedRequest = await Request.findOneAndDelete({ mobile });
    if (!deletedRequest) return res.status(404).json({ message: 'Request not found' });
    res.json({ message: 'Request deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
