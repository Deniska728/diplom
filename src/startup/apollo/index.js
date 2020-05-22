import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';

const cache = new InMemoryCache();

const { REACT_APP_API_URL } = process.env;

const httpLink = new HttpLink({
  uri: REACT_APP_API_URL,
  fetch,
});

const authLink = (operation, forward) => {
  console.log('Аuth with Token', { token: localStorage.getItem('access_token') });
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

const link = ApolloLink.from(links);

const client = new ApolloClient({
  link,
  cache,
});

export default client;
