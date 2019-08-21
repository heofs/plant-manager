import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import firebase from './firebase';

const uri = process.env.REACT_APP_API_URL || 'http://localhost:4000/';
console.log(uri);
const httpLink = new HttpLink({ uri });

const authLink = setContext(async (_, { headers }) => {
  let token = await firebase.isInitialized().then(user => user.ra);

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : '',
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink), // Chain it with the HttpLink
  cache: new InMemoryCache(),
});
