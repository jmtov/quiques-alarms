import { split } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloClient } from 'apollo-client';

const apiURL = process.env.REACT_APP_API_ENDPOINT;
const apiWSURL = process.env.REACT_APP_API_WS_ENDPOINT;

const httpLink = new BatchHttpLink({
  uri: apiURL,
  batchInterval: 30
});

const wsLink = new WebSocketLink({
  uri: apiWSURL,
  options: {
    reconnect: true,
  },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link
});

export default client;
