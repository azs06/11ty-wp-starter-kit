const { ApolloClient, createHttpLink, InMemoryCache } = require('@apollo/client/core');
const fetch = require('cross-fetch');
require('dotenv').config();

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

module.exports = Client;
