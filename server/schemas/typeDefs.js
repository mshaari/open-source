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
  password: String!
  resume: String
  cover_letter: String
  saved_jobs : [Job]
  paid_member: Boolean

}
type Job {
  _id: ID!
  company_name: String
  location: String
  save_date: Date
  title: String
  description: String
  salary_predicted: Int
  salary_max: Float
  salary_min: Float
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
  _id: ID
  company_name: String
  location: String
  title: String
  description: String
  salary_predicted: Int
  salary_max: Float
  salary_min: Float
  contract_time: String
  redirect_url: String
  # progress: Progress
  }
  type Query {
    # Get basic user information by user ID
    user(_id: ID): User
    # Get all users
    users: [User!]!
    # Get job by job ID
    job(_id: ID!): Job
    # Get all jobs
    jobs: [Job!]!
    #find jobs from web API ?
    findJobs(country: String, role: String, location: String): [Job]
    # Stripe integration
    createCheckoutSession: String # '{ url: "STRIPEURL.com"}'
  }
  type Mutation {
    addUser(first_name: String!, last_name: String!, email: String!, password: String!): Auth
    updateMembership(id: ID, paid_member: Boolean): User
    updateUser(id: ID firstName: String, lastName: String, email: String, password: String, paid_member: Boolean, resume: String, cover_letter: String): User
    login(email: String!, password: String!): Auth
    addJob(job: JobData) : Job
    deleteJob(_id: ID) : User
    #addProgess can be used to create a brand new Progress object AND to update an existing Progress object
    addProgress(_id: ID, applied: Boolean, interviewed: Boolean, offer_received: Boolean, end_process: Boolean, notes: String) : User
   }
`;
module.exports = typeDefs;