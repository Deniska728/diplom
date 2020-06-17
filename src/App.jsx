import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';

import ReactGA from 'react-ga';

import MeContextProvider from 'components/auth/MeContextProvider';
import Routes from './Routes';

import client from 'startup/apollo';
import store from 'startup/redux';
import 'startup/analytics';

const history = createBrowserHistory();

history.listen((location) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

const App = () => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <Router history={history}>
        <MeContextProvider>
          <Routes />
        </MeContextProvider>
      </Router>
    </ApolloProvider>
  </Provider>
);

export default App;
