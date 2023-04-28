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

// Mutation to add a job
export const DELETE_JOB = gql`
  mutation deleteJob($_id: ID!) {
    deleteJob(_id: $_id) {
      _id
      email
      cover_letter
      first_name
      last_name
      password
      paid_member
      resume
      saved_jobs {
        _id
        save_date
        location
        title
        description
        salary_predicted
        salary_max
        salary_min
        contract_time
        redirect_url
        progress {
          applied
          end_process
          interviewed
          notes
          offer_received
        }
      }
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
  mutation Mutation($id: ID!, $firstName: String, $lastName: String, $email: String,  $paidMember: Boolean, $resume: String, $coverLetter: String) {
    updateUser(id: $id, firstName: $firstName, lastName: $lastName, email: $email, paid_member: $paidMember, resume: $resume, cover_letter: $coverLetter) {
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

export const UPDATE_PASSWORD = gql`
mutation updatePassword($password: String, $oldPassword: String) {
  updatePassword(password: $password, oldPassword: $oldPassword) {
    update_successful

  }
}
`

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
export const ADD_PROGRESS = gql`
mutation AddProgress(
  $id: ID
  $applied: Boolean
  $interviewed: Boolean
  $offerReceived: Boolean
  $endProcess: Boolean
  $notes: String
) {
  addProgress(
    _id: $id
    applied: $applied
    interviewed: $interviewed
    offer_received: $offerReceived
    end_process: $endProcess
    notes: $notes
  ) {
    _id
    first_name
    last_name
    email
    password
    resume
    cover_letter
    saved_jobs {
      _id
      company_name
      location
      save_date
      title
      description
      salary_predicted
      salary_max
      salary_min
      contract_time
      redirect_url
      progress {
        applied
        interviewed
        offer_received
        end_process
        notes
      }
    }
    paid_member
  }
}`