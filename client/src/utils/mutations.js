import { gql } from '@apollo/client';

// Mutation to log in
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        first_name
        last_name
        email
        paid_member
      }
    }
  }
`;

// Mutation to add a job
export const ADD_JOB = gql`
  mutation addJob($job: JobData) {
    addJob(job: $job) {
      _id
      save_date
      company_name
      location
      title
      description
      salary_predicted
      salary_max
      salary_min
      contract_time
      redirect_url
    }
  }
`;

// Mutation to add a user (signup)
export const SIGN_UP = gql`
  mutation addUser(
    $firstName: String!, 
    $lastName: String!, 
    $email: String!, 
    $password: String!
  ) {
    addUser(
      first_name: $firstName, 
      last_name: $lastName, 
      email: $email, 
      password: $password
    ) {
      token
      user {
        _id
        email
        first_name
        last_name
        paid_member
      }
    }
  }
`;

// Mutation to update a user
export const UPDATE_USER = gql`
  mutation Mutation($id: ID!, $firstName: String, $lastName: String, $email: String, $password: String, $paidMember: Boolean, $resume: String, $coverLetter: String) {
    updateUser(id: $id, firstName: $firstName, lastName: $lastName, email: $email, password: $password, paid_member: $paidMember, resume: $resume, cover_letter: $coverLetter) {
      _id
      first_name
      last_name
      email
      resume
      cover_letter
      paid_member
    }
  }
`;

// Mutation to update a user's membership status
export const UPDATE_MEMBERSHIP = gql`
  mutation Mutation($id: ID!, $paidMember: Boolean) {
    updateMembership(id: $id, paid_member: $paidMember) {
      _id
      first_name
      last_name
      email
      paid_member
    }
  }
`;
