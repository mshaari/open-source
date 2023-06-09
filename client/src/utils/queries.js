import { gql } from '@apollo/client';

// query for user data
export const QUERY_USER = gql`
  query Query($id: ID!) {
    user(_id: $id) {
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

// Makes a query to get jobs from search input
export const QUERY_JOBS = gql`
  query queryJobs ($country: String!, $role: String!, $location: String!) {
     findJobs(country: $country, role: $role, location: $location) {
      _id
      company_name
      save_date
      location
      title
      description
      contract_time
      redirect_url
      salary_predicted
      salary_min
      salary_max
     }
    }
`;
