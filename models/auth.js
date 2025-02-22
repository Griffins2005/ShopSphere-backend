const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },  // name is required
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;