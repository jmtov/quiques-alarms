import { gql } from 'apollo-boost';

export const GET_SOURCES_QUERY = gql`
query Sources {
  sources {
    id,
    ip_address,
    name
  }
}
`;
