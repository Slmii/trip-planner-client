/* eslint-disable jsx-a11y/anchor-is-valid */
import { useApolloClient } from '@apollo/client';
import { Avatar, Box, Container, Spinner } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import Button from '@components/buttons/button';
import Notifications from '@components/common/header-notifications';
import NavbarItem from '@components/common/header/navbar-item';
import ProfileMenu from '@components/overlay/profile-menu';
import { useMeQuery, useSignOutMutation } from '@generated/graphql';

function Header() {
	const [notificationsPopoverOpen, setNotificationsPopoverOpen] = useState(false);
	const [profilePopoverOpen, setProfilePopoverOpen] = useState(false);
	const [signOutLoading, setSignOutLoading] = useState(false);

	const apolloClient = useApolloClient();

	const router = useRouter();
	const [signOut] = useSignOutMutation();
	const { data, loading: meLoading } = useMeQuery();

	const handleOnSignOut = async () => {
		setProfilePopoverOpen(false);
		setSignOutLoading(true);
		await apolloClient.clearStore();
		await signOut();
		router.push('/signin');
	};

	const handleOnSignInClick = () => {
		router.push('/signin');
	};

	const handleOnSignUpClick = () => {
		router.push('/signup');
	};

	const handleOnCloseProfileMenu = () => setProfilePopoverOpen(false);

	return (
		<Box as='header' width='100%' bgColor='primary.700' fontSize={14}>
			<Container maxW='container.xl'>
				<Box display='flex' justifyContent='space-between' alignItems='center' px={6} py={2}>
					<Box>
						<Link href='/'>
							<Box as='a' fontWeight='bold' color='white'>
								Home
							</Box>
						</Link>
					</Box>
					<Box display='flex' alignItems='center'>
						<NavbarItem>
							<Link href='/explore'>
								<Box as='a' fontWeight='bold' color='white'>
									Explore community
								</Box>
							</Link>
						</NavbarItem>
						<NavbarItem>
							<Link href='/planner'>
								<Box as='a' fontWeight='bold' color='white'>
									Plan a trip
								</Box>
							</Link>
						</NavbarItem>
						{meLoading || signOutLoading ? (
							<NavbarItem>
								<Box display='flex' justifyContent='center' alignItems='center' height='48px'>
									<Spinner size='lg' color='secondary.500' />
								</Box>
							</NavbarItem>
						) : data?.me ? (
							<>
								<NavbarItem>
									<Notifications />
								</NavbarItem>
								<NavbarItem onClick={() => setProfilePopoverOpen(!profilePopoverOpen)}>
									<ProfileMenu
										button={
											<Avatar
												size='md'
												name={data.me.name ?? ''}
												src={data.me.profileImgUrl ?? undefined}
											/>
										}
										isOpen={profilePopoverOpen}
										onClose={handleOnCloseProfileMenu}
										items={[
											{
												href: '/account',
												element: <Box fontWeight='bold'>Account</Box>
											},
											{
												href: '/account/trips',
												element: <Box fontWeight='bold'>My trips</Box>
											},
											{
												href: '/account/favorites',
												element: <Box fontWeight='bold'>My favorites</Box>,
												divider: true
											},
											{
												element: (
													<Box fontWeight='normal' onClick={handleOnSignOut}>
														Sign out
													</Box>
												)
											}
										]}
									/>
								</NavbarItem>
							</>
						) : (
							<>
								<NavbarItem>
									<Button variant='outline' colorScheme='secondary' onClick={handleOnSignInClick}>
										Sign in
									</Button>
								</NavbarItem>
								<NavbarItem>
									<Button variant='solid' colorScheme='secondary' onClick={handleOnSignUpClick}>
										Sign up
									</Button>
								</NavbarItem>
							</>
						)}
					</Box>
				</Box>
			</Container>
		</Box>
	);
}

export default Header;
