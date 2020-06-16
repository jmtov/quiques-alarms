import { gql } from 'apollo-boost';

export const SUMMARY_QUERY =  gql`
  subscription AlarmsSummary{
    alarms {
      id
      status_id
    }
  }
`;
