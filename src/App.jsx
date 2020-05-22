import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import client from 'startup/apollo';

import 'styles/index.scss';

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  </ApolloProvider>
);

export default App;
