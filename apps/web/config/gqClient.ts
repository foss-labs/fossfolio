import { ApolloClient, InMemoryCache } from '@apollo/client';

export const gqClient = new ApolloClient({
    uri: 'https://flyby-router-demo.herokuapp.com/',
    cache: new InMemoryCache(),
});
