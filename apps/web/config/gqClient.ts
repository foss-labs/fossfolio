import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ENV } from '@app/config/env';

export const gqClient = new ApolloClient({
    // supabase graphql base path
    uri: `${ENV}/graphql/v1`,
    cache: new InMemoryCache(),
});
