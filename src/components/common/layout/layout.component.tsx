import { Box, Container } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

import Breadcrumbs from '@components/common/breadcrumbs';
import Explore from '@components/common/explore';
import Footer from '@components/common/footer';
import Header from '@components/common/header';
import { constants } from '@components/common/layout';
import ExtendedFilters from '@components/filters/extended-filters';
import ActivityInvitation from '@components/overlay/activity-invitation';
import Dialog from '@components/overlay/dialog';
import { url } from '@lib/utils';

export default function Layout({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	const [path, subPath] = url.getCurrentRoute(router);
	const fullPath = `${path}/${subPath}`;

	return (
		<>
			<Header />
			<Explore />
			{constants.HAS_EXTENDED_FILTERS.includes(fullPath) && <ExtendedFilters />}
			{subPath && <Breadcrumbs />}
			<Container maxW='container.xl' as='main'>
				<Box p={6}>{children}</Box>
			</Container>
			<Dialog />
			<ActivityInvitation />
			<Footer />
		</>
	);
}
