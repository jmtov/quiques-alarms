import { gql } from 'apollo-boost';

export default gql`
  {
    alarms {
      id,
      name,
      status {
        id,
        description,
        name,
      },
      source {
        id,
        name,
        ip_address,
      },
      trigger_value,
      trigger_condition {
        name,
        display_name
      },
      type {
        id,
        name,
        description,
        display_name
      }
    }
  }
`;
