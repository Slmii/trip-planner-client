import Router from 'next/router';
import { useMeQuery } from '../../generated/graphql';
import { useEffect } from 'react';

const useAuth = () => {
	const { data, loading } = useMeQuery();

	useEffect(() => {
		if (!loading && !data?.me) {
			console.log('redirect');
			Router.push(`/signin?next=${Router.pathname}`);
		}
	}, [data, loading]);
};

export default useAuth;
