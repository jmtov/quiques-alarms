import { gql } from 'apollo-boost';

export const SUMMARY_QUERY =  gql`
  subscription {
    alarms {
      id
      status_id
    }
  }
`;
