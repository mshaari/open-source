require("dotenv").config()
console.log(require("dotenv").config())
const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Order } = require('../models');
const { signToken } = require('../utils/auth');
const axios = require("axios");
// TODO: figure out why process.env.STRIPE_SECRET_KEY isn't loading the variable
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); 


const resolvers = {
  Query: {
    // Get user by ID
        //TODO: set it up to identify the user ID by context, not passed in as args
    user: async (parents, args, context) => {
      if(context.user) {
        return await User.findById(context.user._id)
      }
      throw new AuthenticationError("You need to be logged in!")
    },

    // Get all users
    users: async () => {
      return await User.find()
    },

// Pulls Web API data from adzuna.com
    findJobs: async (parent, { country, role, location }) => {
      const { data } = await axios.get(`https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${process.env.APP_ID}&app_key=${process.env.API_KEY}&results_per_page=20&what=${role}&where=${location}&distance=20`)
      let jobArray = [];
      for (i=0; i < data.results.length; i++){
          let job =  data.results[i];
          if(!job.contract_time){
            var contract = "N/A"
          } else {
            var contract = job.contract_time;
          }
          let jobObject = {
            _id: job.id,
            title: job.title,
            location: job.location.display_name,
            description: job.description,
            salary_predicted: job.salary_is_predicted,
            salary_max: job.salary_max,
            salary_min: job.salary_min,
            company_name: job.company.display_name,
            contract_time: contract,
            redirect_url : job.redirect_url
          }
          jobArray.push(jobObject);
          }
      return jobArray;
    },

    // Stripe integration
    createCheckoutSession: async () => {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: 'price_1MzKj2HjdTfpIyDypkipEIHS',
            quantity: 1
          }
        ],
        mode: 'payment',
        success_url: process.env.FRONTEND_DOMAIN + '/success',
        cancel_url: process.env.FRONTEND_DOMAIN + '/cancel'
      });

      return JSON.stringify({
        url: session.url
      });

    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
   return { token, user };
    },

    // updates user's membership status
    updateMembership : async (parent, args, context) => {
      if(context.user) {

        const user = await User.findByIdAndUpdate(context.user._id , { paid_member: true }, { new: true });

        return user;
      }
      //if context.user does not exist, then we do not have a valid jwt and are not logged in 
      throw new AuthenticationError("You need to be logged in!")
    },

    //finds and updates 1 user by ID - ID is required
    //returns the new/updated version of the user
          //TODO: set it up to take in the user ID from the app's context
    updateUser : async (parent, args, context) => {
      if(context.user) {

        const user = await User.findByIdAndUpdate(context.user._id, {
          first_name: args.firstName,
          last_name: args.lastName,
          email: args.email,
          resume: args.resume,
          password: args.password,
          cover_letter: args.cover_letter
        }, { new: true });

        return user;
      }
      //if context.user does not exist, then we do not have a valid jwt and are not logged in 
      throw new AuthenticationError("You need to be logged in!")
    },
    //logs a user in
    //takes in an email and a password as arguments
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
          if (!user) {
            throw new AuthenticationError('Incorrect credentials');
          }

          const correctPw = await user.isCorrectPassword(password);
    
          if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials');
          }
    
          const token = signToken(user);
          return { token, user };
        },
      //TODO: use React context to grab the user's id
      addJob: async (parent, args, context) => {
        if(context.user) {
        const user = await User.findByIdAndUpdate(
          {_id: context.user._id},
          {$addToSet : {saved_jobs : args.job}},
          {new: true});
        //saved_jobs is an array, we only want to return the most recently created Job
        //so we slice off the last item in the array into its own array, and return the first element in that new array
        const newJob = user.saved_jobs.slice(-1)[0];
        return newJob;
      }
      throw new AuthenticationError('You need to be logged in!');
      },

      deleteJob: async (parent, args, context) => {
        //find the user through their _id in the context 
        if(context.user){
          const user = await User.findByIdAndUpdate(
            {_id: context.user._id},
            //remove the saved job from the saved_jobs array by the _id we are passing in as an argument
            {$pull: {saved_jobs: {_id: args._id}}}, 
            //return the new version of the user, without the deleted job from saved_jobs
            {new: true}
          );
          return user;
        }
      },
//addProgress can be used to add progress AND update progress on a specific saved_job for a user
        addProgress: async(parent, args, context) => {
          console.log(context.user);
          if(context.user){
            const user = await User.findOneAndUpdate(
              //find the user by the user's _id in the context of the app
              {"_id": context.user._id,
              //find the job we want to add progress to in the user's saved_jobs array -- the job's _id gets passed in as an argument
               "saved_jobs._id" : args._id
              },
              //using the $ positional operator, find the saved_job that we want to update, and set the progress object, passing in fields and values as arguments
              {$set: {"saved_jobs.$.progress": {applied: args.applied, interviewed: args.interviewed,
                offer_received: args.offer_received, end_process: args.end_process, notes: args.notes
              }},
            },
            //return the new version of the user, including their new progress on their saved job
              {new: true}
            );
            return user;
          }
        }
 
   }
};

module.exports = resolvers;
