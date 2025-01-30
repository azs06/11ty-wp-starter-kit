import { ApolloClient,  InMemoryCache } from '@apollo/client/core/core.cjs';
import { createHttpLink } from '@apollo/client/link/http/http.cjs';
import fetch from 'cross-fetch';
import dotenv from 'dotenv';

dotenv.config();

/* WordPress GraphQL URL */
const BASE_URI = process.env.WORDPRESS_GRAPHQL_URL;

const httpLink = createHttpLink({
  uri: BASE_URI,
  fetch,
});

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

const Client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions,
});

export default Client;
