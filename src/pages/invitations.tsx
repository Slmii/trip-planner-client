import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useValidateTokenQuery } from '@generated/graphql';
import { withApollo } from '@lib/apollo';

const InvitationsPage = () => {
	const router = useRouter();

	const { token } = router.query;

	const { data, error } = useValidateTokenQuery({
		variables: {
			token: (token as string) ?? ''
		}
	});

	useEffect(() => {
		if (!error) {
			const token = data?.validateInvitationToken.token;
			const hasAccount = data?.validateInvitationToken.hasAccount;

			if (hasAccount) {
				router.push({
					pathname: '/account/received-invitations',
					query: {
						token
					}
				});
			} else {
				router.push({
					pathname: '/signup',
					query: {
						token
					}
				});
			}
		} else {
			console.error(error);
			router.push('/signin');
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <></>;
};

export default withApollo({ ssr: true })(InvitationsPage);
