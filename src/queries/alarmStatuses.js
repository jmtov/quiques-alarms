import { gql } from 'apollo-boost';

export const GET_ALARM_STATUSES_QUERY = gql`
query AlarmStatuses{
  alarm_statuses {
    id
    display_name
    name
    description
  }
}
`;
