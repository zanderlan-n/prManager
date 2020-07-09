import ApolloClient, { InMemoryCache } from 'apollo-boost';
import tokenManager from './tokenManager';

const apolloClient = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache(),
  request: ({ setContext }) => {
    const token = tokenManager.get();
    setContext({
      headers: {
        ...(token && { authorization: token ? `Bearer ${token}` : '' }),
      },
    });
  },
});

export default apolloClient;
