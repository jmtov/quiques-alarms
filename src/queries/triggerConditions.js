import { gql } from 'apollo-boost';

export const GET_TRIGGER_CONDITIONS_QUERY = gql`
query TriggerConditions {
  trigger_conditions {
    id,
    display_name,
    name
  }
}
`;
