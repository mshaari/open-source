const { gql } = require('apollo-server-express');
//TODO: write out queries and mutations (types) below

//'scalar Date' is necessary for us to use the Scalar Type Date
const typeDefs = gql`
scalar Date

type User {
  _id: ID!
  first_name: String!
  last_name: String!
  email: String!
  resume: String
  cover_letter: String
  saved_jobs : [Job]
  paid_member: Boolean
}

type Job {
  _id: ID
  save_date: Date
  location: String
  title: String
  description: String
  salary_predicted: Boolean
  salary_max: Int
  salary_min: Int
  contract_time: String
  redirect_url: String
  progress: Progress
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

  input JobData {
  location: String
  title: String
  description: String
  salary_predicted: Boolean
  salary_max: Int
  salary_min: Int
  contract_time: String
  redirect_url: String
  # progress: Progress
  }

  type Query {
    # Get basic user information by user ID
    user(_id: ID!): User
    # Get all users
    users: [User!]!
    # Get job by job ID
    job(_id: ID!): Job
    # Get all jobs
    jobs: [Job!]!
  }

  type Mutation {
    addUser(first_name: String!, last_name: String!, email: String!, password: String!): Auth
    updateUser(_id: ID! firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    addJob(job: JobData) : Job
   }
`;

module.exports = typeDefs;
