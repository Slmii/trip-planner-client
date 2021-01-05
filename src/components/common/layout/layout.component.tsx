import React from 'react';
import { useRouter } from 'next/router';
const Container = require('@material-ui/core/Container').default;
const Box = require('@material-ui/core/Box').default;

import Header from '@components/common/header';
import Footer from '@components/common/footer';
import Explore from '@components/common/explore';
import Breadcrumbs from '@components/common/breadcrumbs';
import ExtendedFilters from '@components/filters/extended-filters';
import Dialog from '@components/dialogs/dialog';
import Snackbar from '@components/snackbar';
import ActivityInvitation from '@components/dialogs/activity-invitation';
import { constants } from '@components/common/layout';
import { helpers } from '@lib/utils';

export default function Layout({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	const [path] = helpers.getCurrentRoute(router);

	return (
		<>
			<Header />
			<Explore />
			{constants.HAS_EXTENDED_FILTERS.includes(path) && <ExtendedFilters />}
			{path && <Breadcrumbs />}
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
