import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { split, ApolloLink } from 'apollo-link';

const cache = new InMemoryCache();

const { REACT_APP_API_URL, REACT_APP_WS_URL } = process.env;

const wsLink = new WebSocketLink({
  uri: REACT_APP_WS_URL,
  options: {
    reconnect: true,
    connectionParams: {
      Authorization: localStorage.getItem('access_token')
        ? `Bearer ${localStorage.getItem('access_token')}`
        : '',
    },
  },
});

const httpLink = new HttpLink({
  uri: REACT_APP_API_URL,
  fetch,
});

const authLink = (operation, forward) => {
  const token = localStorage.getItem('access_token') || null;
  operation.setContext({
    headers: {
      ...operation.getContext().headers,
      Authorization: token ? `Bearer ${token}` : null,
    },
  });

  return forward(operation);
};

let links = [authLink, httpLink];

const linkWithAuth = ApolloLink.from(links);

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  linkWithAuth,
);

const client = new ApolloClient({
  link,
  cache,
});

export default client;
