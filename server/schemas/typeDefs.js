const { gql } = require('apollo-server-express');
//TODO: write out queries and mutations (types) below

//'scalar Date' is necessary for us to use the Scalar Type Date
const typeDefs = gql`
scalar Date

type User {
  _id: ID
  first_name: String
  last_name: String
  email: String
  resume: String
  cover_letter: String
  saved_jobs : [Job]
  paid_member: Boolean
}

type Job {
  save_date: Date
  location: String
  title: String
  description: String
  salary_predicted: Boolean
  salary_max: Int
  salary_min: Int
  contract_time: String
  redirect_url: String
  progress: [Progress]
}

type Progress {
  applied: Boolean
  interviewed: Boolean
  offer_received: Boolean
  end_process: Boolean
  notes: String
}

  type Auth {
    token: ID
    user: User
  }

  type Query {
    # Get basic user information by user ID
    user(id: ID!): User
  
    # Check paid membership status for a user
    paidmember(userId: ID!): User
  
    # Get a user's resume and cover letter by user ID
  
  
    # Get a user's saved jobs by user ID
    getSavedJobs(userId: ID!): [Job]
  
    # Get the progress data for a saved job
    getJobProgress(jobId: ID!): [Progress]
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
