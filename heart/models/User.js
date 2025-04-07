const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  telegram_id: { type: String, required: true, unique: true },
  username: String,
  first_name: String,
  created_at: { type: Date, default: Date.now }
});



module.exports = mongoose.model('User', userSchema);
