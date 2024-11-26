const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  mobile: { type: Number, required: true, unique: true },
  email: { type: String, required: true },
  occupation: { type: String },
  createpassword: { type: String, required: true }
});

module.exports = mongoose.model('members', MemberSchema);
