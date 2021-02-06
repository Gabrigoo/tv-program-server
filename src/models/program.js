const mongoose = require('mongoose');

const programScema = new mongoose.Schema({
  channel: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  start_from: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: ''
  },
  age_limit: {
    type: Number,
    default: 0
  },
});

const Program = mongoose.model('Program', programScema);

module.exports = Program;