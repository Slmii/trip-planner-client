import { useRouter } from 'next/router';
import React from 'react';

import Breadcrumbs from '@components/common/breadcrumbs';
import Explore from '@components/common/explore';
import Footer from '@components/common/footer';
import Header from '@components/common/header';
import { constants } from '@components/common/layout';
import ActivityInvitation from '@components/dialogs/activity-invitation';
import Dialog from '@components/dialogs/dialog';
import ExtendedFilters from '@components/filters/extended-filters';
import Snackbar from '@components/snackbar';
import { helpers } from '@lib/utils';

const Container = require('@material-ui/core/Container').default;
const Box = require('@material-ui/core/Box').default;

export default function Layout({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	const [path, subPath] = helpers.getCurrentRoute(router);

	return (
		<>
			<Header />
			<Explore />
			{constants.HAS_EXTENDED_FILTERS.includes(path) && <ExtendedFilters />}
			{subPath && <Breadcrumbs />}
			<Container component='main' fixed disableGutters={true}>
				<Box p={1.5}>{children}</Box>
			</Container>
			<Dialog />
			<ActivityInvitation />
			<Snackbar />
			<Footer />
		</>
	);
}
