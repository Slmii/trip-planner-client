/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Link from 'next/link';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/client';
import { useTheme } from '@material-ui/core/styles';

import Button from '@components/buttons/button';
import IconButton from '@components/buttons/icon-button';
import Dropdown from '@components/dropdown';
import Notifications from '@components/common/notifications';
import { Styled } from '@components/common/header';
import { helpers } from '@lib/utils';
import {
	useMeQuery,
	useSignOutMutation,
	useHeaderNotificationsQuery,
	useMarkAllHeaderNotificationsAsReadMutation,
	HeaderNotificationsQuery,
	HeaderNotificationsDocument
} from '@generated/graphql';

import { Theme } from '@theme/index';
import Badge from '@material-ui/core/Badge';

function Header() {
	const [notificationsAnchorEl, setNotificationsAnchorEl] = useState<Element | null>(null);
	const [profileAnchorEl, setProfileAnchorEl] = useState<HTMLElement | null>(null);

	const apolloClient = useApolloClient();
	const router = useRouter();
	const theme: Theme = useTheme();

	const [signOut, { loading: signOutLoading }] = useSignOutMutation();
	const [markAllAsRead] = useMarkAllHeaderNotificationsAsReadMutation();
	const { data, loading: meLoading } = useMeQuery();
	const { data: notificationsData } = useHeaderNotificationsQuery();

	const handleOnSignOut = async () => {
		setProfileAnchorEl(null);
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

	const handleOnMarkAllAsRead = () => {
		markAllAsRead({
			update: cache => {
				const cacheNotifications = cache.readQuery<HeaderNotificationsQuery>({
					query: HeaderNotificationsDocument
				});

				if (!cacheNotifications) {
					return;
				}

				const modifiedNotifications = cacheNotifications.notifications.map(notification => ({
					...notification,
					read: true
				}));

				cache.writeQuery<HeaderNotificationsQuery>({
					query: HeaderNotificationsDocument,
					data: {
						notifications: modifiedNotifications
					}
				});
			}
		});
	};

	const unreadNotifications = notificationsData?.notifications.filter(notification => !notification.read).length;

	return (
		<Box component='header' width='100%' bgcolor={theme.palette.primary.dark} fontSize={14}>
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				height='100%'
				maxWidth={1280}
				marginLeft='auto'
				marginRight='auto'
				px={1.5}
			>
				<Box>
					<Link href='/'>
						<a className='bold white'>Home</a>
					</Link>
				</Box>
				<Box display='flex' alignItems='center'>
					<Styled.NavbarItem>
						<Link href='/explore'>
							<a className='bold white'>Explore community</a>
						</Link>
					</Styled.NavbarItem>
					<Styled.NavbarItem>
						<Link href='/planner'>
							<a className='bold white'>Plan a trip</a>
						</Link>
					</Styled.NavbarItem>
					{meLoading || signOutLoading ? (
						<Box display='flex' justifyContent='center' alignItems='center' width='100px' ml={0.75}>
							<CircularProgress size='1.5rem' color='secondary' />
						</Box>
					) : data?.me ? (
						<>
							<IconButton
								icon={
									unreadNotifications ? (
										<Badge badgeContent={unreadNotifications} color='secondary'>
											<NotificationsActiveIcon className='white' />
										</Badge>
									) : (
										<NotificationsActiveIcon className='white' />
									)
								}
								onClick={e => setNotificationsAnchorEl(e.currentTarget)}
								title={unreadNotifications ? 'You have unread notifications' : ''}
								tooltip={true}
							/>
							<Styled.NavbarItem onClick={e => setProfileAnchorEl(e.currentTarget)}>
								<Avatar style={{ width: 44, height: 44 }}>{helpers.transformToAvatarInitials(data.me.name)}</Avatar>
							</Styled.NavbarItem>
						</>
					) : (
						<>
							<Styled.NavbarItem>
								<Button variant='outlined' color='secondary' className='bold' onClick={handleOnSignInClick}>
									Sign in
								</Button>
							</Styled.NavbarItem>
							<Styled.NavbarItem>
								<Button variant='contained' color='secondary' className='bold' onClick={handleOnSignUpClick}>
									Sign up
								</Button>
							</Styled.NavbarItem>
						</>
					)}
				</Box>
			</Box>
			<Notifications
				anchor={notificationsAnchorEl}
				onClose={() => setNotificationsAnchorEl(null)}
				onMarkAllAsRead={handleOnMarkAllAsRead}
				notifications={notificationsData?.notifications ?? []}
			/>
			<Dropdown
				anchor={profileAnchorEl}
				onClose={() => setProfileAnchorEl(null)}
				items={[
					{
						href: '/account',
						element: <Box fontWeight='bold'>My account</Box>,
						action: () => setProfileAnchorEl(null)
					},
					{
						href: '/trips/my-trips',
						element: <Box fontWeight='bold'>My trips</Box>,
						action: () => setProfileAnchorEl(null)
					},
					{
						href: '/activities/my-activities',
						element: <Box fontWeight='bold'>My activities</Box>,
						action: () => setProfileAnchorEl(null)
					},
					{
						href: '/trips/favorites',
						element: <Box fontWeight='bold'>My favorites</Box>,
						action: () => setProfileAnchorEl(null),
						divider: true
					},
					{
						action: handleOnSignOut,
						element: <Box>Sign out</Box>
					}
				]}
			/>
		</Box>
	);
}

export default Header;
