/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useApolloClient } from '@apollo/client';
const Box = require('@material-ui/core/Box').default;
const Avatar = require('@material-ui/core/Avatar').default;
const CircularProgress = require('@material-ui/core/CircularProgress').default;
const Menu = require('@material-ui/icons/Menu').default;
const { useTheme } = require('@material-ui/core/styles');

import { Button } from '@components/button';
import { Dropdown } from '@components/dropdown';
import { useOutsideClick } from '@lib/hooks';
import { useMeQuery, useSignOutMutation } from '@generated/graphql';

import { NavbarItem, ProfileMenu, Badge, PulseBadge } from './header.styled';
import { Theme } from '@theme/index';
import { globalStyles } from '@styles/global-styled';

function Header() {
	const profileMenuRef = useRef<HTMLDivElement | null>(null);
	const [visible, setVisible] = useState<boolean>(false);
	const { iconMr } = globalStyles();

	const apolloClient = useApolloClient();
	const router = useRouter();
	const theme: Theme = useTheme();
	useOutsideClick(profileMenuRef, () => setVisible(false));
	const [signOut, { loading: signOutLoading }] = useSignOutMutation();
	const { data, loading: meLoading } = useMeQuery();

	const badgeCount = 5;

	const handleOnSignOut = async () => {
		setVisible(false);
		await signOut();
		await apolloClient.clearStore();
		router.push('/signin');
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
				p={1.5}
			>
				<Box>
					<Link href='/'>
						<a className='bold white' title='Home'>
							Home
						</a>
					</Link>
				</Box>
				<Box display='flex' alignItems='center'>
					<NavbarItem>
						<Link href='/search'>
							<a className='bold white' title='Look for trips'>
								Look for trips
							</a>
						</Link>
					</NavbarItem>
					<NavbarItem>
						<Link href='/planner'>
							<a className='bold white' title='Planner'>
								Plan a trip
							</a>
						</Link>
					</NavbarItem>
					{meLoading || signOutLoading ? (
						<Box display='flex' justifyContent='center' alignItems='center' width='100px' ml={0.75}>
							<CircularProgress size='1.5rem' color='secondary' />
						</Box>
					) : data?.me ? (
						<NavbarItem ref={profileMenuRef} onClick={() => setVisible(!visible)}>
							<PulseBadge
								overlap='circle'
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'right'
								}}
								variant='dot'
							>
								<Avatar style={{ width: 44, height: 44 }}>
									{data.me.name
										.split(' ')
										.map(n => n[0])
										.join('')}
								</Avatar>
							</PulseBadge>
							<Dropdown
								visible={visible}
								items={[
									{
										href: '/notifications',
										element: (
											<Box display='flex'>
												<Box fontWeight='bold'>Notifications</Box>
												<Badge color='secondary' badgeContent={badgeCount} max={99} />
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
										element: <Box>{data.me.name}</Box>
									},
									{
										action: handleOnSignOut,
										element: <Box>Sign out</Box>
									}
								]}
							/>
						</NavbarItem>
					) : (
						<>
							<NavbarItem>
								<Button variant='outlined' color='secondary' size='large' className='bold' onClick={handleOnSignInClick}>
									Sign in
								</Button>
							</NavbarItem>
							<NavbarItem>
								<Button
									variant='contained'
									color='secondary'
									size='large'
									className='bold white'
									onClick={handleOnSignUpClick}
								>
									Sign up
								</Button>
							</NavbarItem>
						</>
					)}
				</Box>
			</Box>
		</Box>
	);
}

export default Header;
