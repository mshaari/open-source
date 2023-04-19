const mongoose = require('mongoose');

const { Schema } = mongoose;

const progressSchema = new Schema({
  
  applied : {
    type: Boolean
  },
  interviewed: {
    type: Boolean
  },
  offerReceived : {
    type: Boolean
  },
  endProcess: {
    type: Boolean
  },
  notes : {
    type: String
  }
});

const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;
