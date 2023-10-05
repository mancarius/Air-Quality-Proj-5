const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  favoriteCities: [{ type: String }], // Array di città preferite
  token: String,
});

module.exports = mongoose.model('User', userSchema);
