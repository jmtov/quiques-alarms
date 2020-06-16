import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router } from 'react-router-dom';

import client from 'config/apollo';
import { StaticPropsContextProvider } from 'contexts/staticProps';

import Routes from 'components/Routes';

function App() {
  return (
    <ApolloProvider client={client}>
      <StaticPropsContextProvider>
        <Router>
          <Routes />
        </Router>
      </StaticPropsContextProvider>
    </ApolloProvider>
  );
}

export default App;
