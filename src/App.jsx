import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Routes from './Routes';

import client from 'startup/apollo';
import store from 'startup/redux';

const App = () => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ApolloProvider>
  </Provider>
);

export default App;
