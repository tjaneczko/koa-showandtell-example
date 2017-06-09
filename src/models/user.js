const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  accountId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

const Model = mongoose.model('user', schema);

module.exports = { schema, Model };