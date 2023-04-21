import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query Query($id: ID!) {
    user(_id: $id) {
      _id
      email
      cover_letter
      first_name
      last_name
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

