import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';
import { useRouter } from 'next/router';

import AccountMenu, { constants, Styled } from '@components/account/account-menu';
import Notifications from '@components/account/notifications';
import Layout from '@components/common/layout';
import MyFavorites from '@components/trips/my-favorites';
import MyTrips from '@components/trips/my-trips';
import { withApollo } from '@lib/apollo';
import { helpers } from '@lib/utils';

import { globalStyles } from '@styles/index';

const PAGE_COMPONENT: Record<string, JSX.Element> = {
	trips: <MyTrips />,
	favorites: <MyFavorites />,
	notifications: <Notifications />
};

function AccountPage() {
	const router = useRouter();
	const { 1: subPath } = helpers.getCurrentRoute(router);

	const { iconMr, bold } = globalStyles();
	const { onHover, textDecorationNone } = Styled.accountMenuStyles();

	return (
		<Layout>
			<Box display='flex' width='100%'>
				{Object.keys(PAGE_COMPONENT).includes(subPath) ? (
					<>
						<AccountMenu />
						<Box width='calc(85% - 32px)'>
							{Object.keys(PAGE_COMPONENT).includes(subPath) && PAGE_COMPONENT[subPath]}
						</Box>
					</>
				) : (
					<Box display='flex' flexDirection='column'>
						<Box px={0.5} mb={2}>
							<Typography variant='h5' component='h1' gutterBottom className={bold}>
								Account
							</Typography>
							<Typography variant='body1'>Manage my environment</Typography>
						</Box>
						<Box display='flex' flexWrap='wrap' margin='0 auto'>
							{constants.ACCOUNT_MENU.map(menu => (
								<Box key={menu.key} width='33%' px={0.5} my={0.5}>
									<Link href={`/account/${menu.key}`}>
										{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
										<a className={textDecorationNone}>
											<Paper elevation={2} className={onHover}>
												<Box display='flex' flexDirection='column' p={2} minHeight='160px'>
													<Box display='flex' mb={1} alignItems='center'>
														<menu.Icon className={iconMr} />
														<Typography variant='h6' component='h2' className={bold}>
															{menu.title}
														</Typography>
													</Box>
													<Typography variant='body2'>{menu.description}</Typography>
												</Box>
											</Paper>
										</a>
									</Link>
								</Box>
							))}
						</Box>
					</Box>
				)}
			</Box>
		</Layout>
	);
}

export default withApollo({ ssr: true })(AccountPage);
