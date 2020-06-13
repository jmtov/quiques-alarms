import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://quiques-alarms.herokuapp.com/v1/graphql',
});

export default client;
