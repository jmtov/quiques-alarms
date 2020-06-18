import { gql } from 'apollo-boost';

export default gql`
  subscription Notifications {
    alarms(where: { status_id: { _eq: 1 } }) {
      id,
      name,
    }
  }
`;
