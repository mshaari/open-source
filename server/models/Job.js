const mongoose = require('mongoose');

const { Schema } = mongoose;
const progressSchema = require('./Progress');

const jobSchema = new Schema({
  saveDate: {
    type: Date,
    default: Date.now
  },
  //we want to pull the display name from the API
  location: {
    type: String
  },
  title : {
    type: String
  },
  description: {
    type: String 
  },
  salaryPredicted : {
    type: Boolean
  },
  salary_max : {
    type: Number
  },
  salary_min: {
    type: Number
  },
  //API will return full-time, part-time, contract, or permanent
  contract_time: {
    type: String
  },
  redirect_url: {
    type: String
  },
  progress : [progressSchema]

  
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
