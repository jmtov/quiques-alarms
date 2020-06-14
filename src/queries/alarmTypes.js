import { gql } from 'apollo-boost';

export const GET_ALARM_TYPES_QUERY = gql`
{
  alarm_types {
    id
    description
    display_name
    name
  }
}
`;
