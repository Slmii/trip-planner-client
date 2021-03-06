import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { NextPageContext } from 'next';

import { IS_SERVER } from '@lib/constants';

import { createWithApollo } from './createWithApollo';

// const link = onError(({ graphQLErrors, networkError }) => {
// 	if (graphQLErrors)
// 		graphQLErrors.map(({ message, locations, path }) =>
// 			console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
// 		);

// 	if (networkError) console.log(`[Network error]: ${networkError}`);
// });

const createClient = (ctx: NextPageContext) =>
	new ApolloClient({
		ssrMode: IS_SERVER,
		link: new HttpLink({
			uri: process.env.NEXT_PUBLIC_API_URL as string,
			credentials: 'include',
			headers: {
				cookie: (IS_SERVER ? ctx?.req?.headers.cookie : undefined) || ''
			}
		}),
		defaultOptions: {
			mutate: {
				errorPolicy: 'all'
			},
			query: {
				errorPolicy: 'all'
			}
		},
		cache: new InMemoryCache()
	});

export const withApollo = createWithApollo(createClient);
