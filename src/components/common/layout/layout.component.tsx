const Container = require('@material-ui/core/Container').default;
const Box = require('@material-ui/core/Box').default;

import { Header, Footer } from '@components/common';
import { ExtendedFilters } from '@components/filters';
import { Dialog } from '@components/dialog';
import { Snackbar } from '@components/snackbar';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<ExtendedFilters />
			<Container component='main' fixed disableGutters={true}>
				<Box p={1.5}>{children}</Box>
			</Container>
			<Dialog />
			<Snackbar />
			<Footer />
		</>
	);
}
