const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    // Get user by ID
    user: async (parents, args, context) => {
      return await User.findById(args._id)
    },

    // Get all users
    users: async () => {
      return await User.find()
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
   return { token, user };
    },
    updateUser : async (parent, args) => {
      const user = await User.findByIdAndUpdate(args, {new: true} );
      return user;
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
