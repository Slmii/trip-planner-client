import React from 'react';
import cn from 'classnames';
import CardTravelOutlinedIcon from '@material-ui/icons/CardTravelOutlined';
import BeachAccessOutlinedIcon from '@material-ui/icons/BeachAccessOutlined';
import { useRouter } from 'next/router';
const Container = require('@material-ui/core/Container').default;
const Box = require('@material-ui/core/Box').default;

import Header from '@components/common/header';
import Footer from '@components/common/footer';
import ExtendedFilters from '@components/filters/extended-filters';
import Dialog from '@components/dialogs/dialog';
import Snackbar from '@components/snackbar';
import { constants, Styled } from '@components/common/layout';

import theme from '@theme/index';
import { globalStyles } from '@styles/global-styled';

export default function Layout({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	const { iconMr } = globalStyles();
	const { active } = Styled.layoutStyles();

	const exploreUrlQuery = router.query.explore ? router.query.explore[0] : undefined;

	return (
		<>
			<Header />
			<Box bgcolor={theme.palette.primary.dark}>
				<Container fixed disableGutters={true}>
					<Box display='flex' margin='0 24px' color='white' alignItems='center'>
						<Styled.ExploreItem
							onClick={() => router.push('/explore/trips')}
							className={cn({
								[active]: exploreUrlQuery === 'trips'
							})}
						>
							<CardTravelOutlinedIcon className={iconMr} />
							Explore trips
						</Styled.ExploreItem>
						<Styled.ExploreItem
							onClick={() => router.push('/explore/activities')}
							className={cn({
								[active]: exploreUrlQuery === 'activities'
							})}
						>
							<BeachAccessOutlinedIcon className={iconMr} />
							Explore activities
						</Styled.ExploreItem>
					</Box>
				</Container>
			</Box>
			{constants.HAS_EXTENDED_FILTERS.includes(Object.keys(router.query)[0]) && <ExtendedFilters />}
			<Container component='main' fixed disableGutters={true}>
				<Box p={1.5}>{children}</Box>
			</Container>
			<Dialog />
			<Snackbar />
			<Footer />
		</>
	);
}
