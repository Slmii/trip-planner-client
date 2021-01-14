import Router from 'next/router';
import { useEffect } from 'react';

import { useMeQuery } from '../../generated/graphql';

const useAuth = () => {
	const { data, loading } = useMeQuery();

	useEffect(() => {
		if (!loading && !data?.me) {
			Router.push(`/signin?next=${Router.pathname}`);
		}
	}, [data, loading]);
};

export default useAuth;
