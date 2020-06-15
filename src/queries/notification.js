import { gql } from 'apollo-boost';

export default gql`
  subscription {
    alarms(where: { status_id: { _eq: 1 } }) {
      id,
      name,
    }
  }
`;
