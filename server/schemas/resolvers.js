const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    // Get user by ID
        //TODO: set it up to identify the user ID by context, not passed in as args
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
    //finds and updates 1 user by ID - ID is required
    //returns the new/updated version of the user
          //TODO: set it up to take in the user ID from the app's context
    updateUser : async (parent, args) => {
      const user = await User.findByIdAndUpdate(args, {new: true} );
      return user;
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
        const user = await User.findByIdAndUpdate(
          {_id: '644039c6ee5020e4ec957056'},
          {$addToSet : {saved_jobs : args.job}},
          {new: true});
        //saved_jobs is an array, we only want to return the most recently created Job
        //so we slice off the last item in the array into its own array, and return the first element in that new array
        const newJob = user.saved_jobs.slice(-1)[0];
        return newJob;
        
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
