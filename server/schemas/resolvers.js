const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Order } = require('../models');
const { signToken } = require('../utils/auth');
const axios = require("axios");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
require('dotenv').config();

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
      // console.log(data)
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
      console.log(jobArray)
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

    //finds and updates 1 user by ID - ID is required
    //returns the new/updated version of the user
          //TODO: set it up to take in the user ID from the app's context
    updateUser : async (parent, args, context) => {
      if(context.user) {
      const user = await User.findByIdAndUpdate(args, {new: true} );
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
      }

  //   addOrder: async (parent, { products }, context) => {
  //     console.log(context);
  //     if (context.user) {
  //       const order = new Order({ products });

  //       await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

  //       return order;
  //     }

  //     throw new AuthenticationError('Not logged in');
  //   },
  //   updateUser: async (parent, args, context) => {
  //     if (context.user) {
  //       return await User.findByIdAndUpdate(context.user._id, args, { new: true });
  //     }

  //     throw new AuthenticationError('Not logged in');
  //   },
  //   updateProduct: async (parent, { _id, quantity }) => {
  //     const decrement = Math.abs(quantity) * -1;

  //     return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
  //   },
 
   }
};

module.exports = resolvers;
