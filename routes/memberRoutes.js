const express = require('express');
const Member = require('../models/member');
const router = express.Router();


router.post('/member', async (req, res) => {
  const { mobile, email, occupation, createpassword } = req.body;
  try {
    const newMember = new Member({ mobile, email, occupation, createpassword });
    await newMember.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put('/updatepassword', async (req, res) => {
  const { mobile, password } = req.body;
  try {
    const member = await Member.findOneAndUpdate(
      { mobile },
      { createpassword: password },
      { new: true }
    );
    if (!member) return res.status(404).json({ message: 'Member not found' });
    res.json(member);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete('/cancelmember', async (req, res) => {
  const { mobile } = req.body;
  try {
    const deletedMember = await Member.findOneAndDelete({ mobile });
    if (!deletedMember) return res.status(404).json({ message: 'Member not found' });
    res.json({ message: 'Membership cancelled' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
