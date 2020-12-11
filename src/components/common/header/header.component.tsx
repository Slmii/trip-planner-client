/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
// import { useApolloClient } from '@apollo/client';
const Box = require('@material-ui/core/Box').default;
const CircularProgress = require('@material-ui/core/CircularProgress').default;
const AccountCircle = require('@material-ui/icons/AccountCircle').default;
const { useTheme } = require('@material-ui/core/styles');

import { Button } from '@components/button';
import { Dropdown } from '@components/dropdown';
import { useOutsideClick } from '@lib/hooks';
import { MeDocument, MeQuery, useMeQuery, useSignOutMutation } from '@generated/graphql';

import * as S from './header.styled';
import { Theme } from '@theme/index';
import { globalStyles } from '@styles/global-styled';

function Header() {
	const profileMenuRef = useRef<HTMLDivElement | null>(null);
	const [visible, setVisible] = useState<boolean>(false);
	const { iconMr } = globalStyles();

	// const apolloClient = useApolloClient();
	const router = useRouter();
	const theme: Theme = useTheme();
	useOutsideClick(profileMenuRef, () => setVisible(false));
	const [signOut, { loading: signOutLoading }] = useSignOutMutation();
	const { data, loading: meLoading } = useMeQuery();

	const badgeCount = 5;

	const handleOnSignOut = async () => {
		setVisible(false);
		await signOut({
			update: (cache, _result) => {
				cache.writeQuery<MeQuery>({
					query: MeDocument,
					data: {
						__typename: 'Query',
						me: null
					}
				});

				cache.modify({
					fields: {
						myTrips(_, { DELETE }) {
							return DELETE;
						}
					}
				});
			}
		});

		// await client.clearStore();
		// router.push('/signin');
	};

	const handleOnSignInClick = () => {
		router.push('/signin');
	};

	const handleOnSignUpClick = () => {
		router.push('/signup');
	};

	return (
		<Box component='header' width='100%' height='80px' bgcolor={theme.palette.text.primary} color='white' fontSize={14}>
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				height='100%'
				maxWidth={1280}
				marginLeft='auto'
				marginRight='auto'
			>
				<Box>
					<Link href='/'>
						<a className='bold white' title='Home'>
							Home
						</a>
					</Link>
				</Box>
				<Box display='flex' alignItems='center'>
					<S.NavbarItem>
						<Link href='/search'>
							<a className='bold white' title='Look for trips'>
								Look for trips
							</a>
						</Link>
					</S.NavbarItem>
					<S.NavbarItem>
						<Link href='/planner'>
							<a className='bold white' title='Planner'>
								Plan a trip
							</a>
						</Link>
					</S.NavbarItem>
					{meLoading || signOutLoading ? (
						<Box display='flex' justifyContent='center' alignItems='center' width='100px' ml={0.75}>
							<CircularProgress size='1.5rem' />
						</Box>
					) : data?.me ? (
						<S.ProfileMenu ref={profileMenuRef} onClick={() => setVisible(!visible)}>
							<AccountCircle className={iconMr} />
							<Box className='bold'>
								{badgeCount ? (
									<S.PulseBadge color='primary' variant='dot'>
										{data.me.name}
									</S.PulseBadge>
								) : (
									<>{data.me.name}</>
								)}
							</Box>
							<Dropdown
								visible={visible}
								items={[
									{
										href: '/notifications',
										element: (
											<Box display='flex'>
												<Box fontWeight='bold'>Notifications</Box>
												<S.Badge color='primary' badgeContent={badgeCount} max={99} />
											</Box>
										)
									},
									{
										href: '/trips/my-trips',
										element: <Box fontWeight='bold'>My trips</Box>
									},
									{
										href: '/trips/favorites',
										element: <Box fontWeight='bold'>My favorites</Box>,
										divider: true
									},
									{
										href: '/account',
										element: <Box>Selami Sensei</Box>
									},
									{
										action: handleOnSignOut,
										element: <Box>Sign out</Box>
									}
								]}
							/>
						</S.ProfileMenu>
					) : (
						<>
							<S.NavbarItem>
								<Button
									variant='contained'
									color='primary'
									size='large'
									className='fs-14 bold'
									onClick={handleOnSignInClick}
								>
									Sign in
								</Button>
							</S.NavbarItem>
							<S.NavbarItem>
								<Button
									variant='outlined'
									color='primary'
									size='large'
									className='fs-14 bold white'
									onClick={handleOnSignUpClick}
								>
									Sign up
								</Button>
							</S.NavbarItem>
						</>
					)}
				</Box>
			</Box>
		</Box>
	);
}

export default Header;
