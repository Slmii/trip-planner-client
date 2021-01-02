import { useRouter } from 'next/router';
const Container = require('@material-ui/core/Container').default;
const Box = require('@material-ui/core/Box').default;

import Header from '@components/common/header';
import Footer from '@components/common/footer';
import ExtendedFilters from '@components/filters/extended-filters';
import Dialog from '@components/dialogs/dialog';
import Snackbar from '@components/snackbar';
import { constants } from '@components/common/layout';

export default function Layout({ children }: { children: React.ReactNode }) {
	const { trips } = useRouter().query;

	return (
		<>
			<Header />
			{constants.HAS_EXTENDED_FILTERS.includes(trips as string) && <ExtendedFilters />}
			<Container component='main' fixed disableGutters={true}>
				<Box p={1.5}>{children}</Box>
			</Container>
			<Dialog />
			<Snackbar />
			<Footer />
		</>
	);
}
