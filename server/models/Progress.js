const mongoose = require('mongoose');

const { Schema } = mongoose;

const progressSchema = new Schema({
  
  applied : {
    type: Boolean
  },
  interviewed: {
    type: Boolean
  },
  offer_received : {
    type: Boolean
  },
  end_process: {
    type: Boolean
  },
  notes : {
    type: String
  }
});

module.exports = progressSchema;
