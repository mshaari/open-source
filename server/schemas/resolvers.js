const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Order } = require('../models');
const { signToken } = require('../utils/auth');
const axios = require("axios");
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
require('dotenv').config();

const resolvers = {
  Query: {
    // Get user by ID
    user: async (parents, args, context) => {
      return await User.findById(args._id)
    },

    // Get all users
    users: async () => {
      return await User.find()
    },

    // Pulls Web API data from adzuna.com
    findJobs: async (parent, { country, role, location }) => {
      const { data } = await axios.get(`https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${process.env.APP_ID}&app_key=${process.env.API_KEY}&results_per_page=20&what=${role}&where=${location}&distance=20`)
      console.log(data)
      return data.results
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
   return { token, user };
    },

    

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
  //   login: async (parent, { email, password }) => {
  //     const user = await User.findOne({ email });

  //     if (!user) {
  //       throw new AuthenticationError('Incorrect credentials');
  //     }

  //     const correctPw = await user.isCorrectPassword(password);

  //     if (!correctPw) {
  //       throw new AuthenticationError('Incorrect credentials');
  //     }

  //     const token = signToken(user);

  //     return { token, user };
  //   }
   }
};

module.exports = resolvers;
