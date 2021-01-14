/* eslint-disable jsx-a11y/anchor-is-valid */
import { useApolloClient } from '@apollo/client';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTheme } from '@material-ui/core/styles';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import Button from '@components/buttons/button';
import IconButton from '@components/buttons/icon-button';
import { Styled } from '@components/common/header';
import Notifications from '@components/common/notifications';
import Dropdown from '@components/dropdown';
import {
    HeaderNotificationsDocument,
    HeaderNotificationsQuery,
    useHeaderNotificationsQuery,
    useMarkAllHeaderNotificationsAsReadMutation,
    useMeQuery,
    useSignOutMutation
} from '@generated/graphql';
import { helpers } from '@lib/utils';

import { Theme } from '@theme/index';

function Header() {
	const [notificationsAnchorEl, setNotificationsAnchorEl] = useState<Element | null>(null);
	const [profileAnchorEl, setProfileAnchorEl] = useState<HTMLElement | null>(null);
	const [signOutLoading, setSignOutLoading] = useState(false);

	const apolloClient = useApolloClient();
	const router = useRouter();
	const theme: Theme = useTheme();

	const [signOut] = useSignOutMutation();
	const [markAllAsRead] = useMarkAllHeaderNotificationsAsReadMutation();
	const { data, loading: meLoading } = useMeQuery();
	const { data: notificationsData } = useHeaderNotificationsQuery();

	const handleOnSignOut = async () => {
		setProfileAnchorEl(null);
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

	const handleOnMarkAllAsRead = () => {
		markAllAsRead({
			update: cache => {
				const cachedNotifications = cache.readQuery<HeaderNotificationsQuery>({
					query: HeaderNotificationsDocument
				});

				if (!cachedNotifications) {
					return;
				}

				const modifiedNotifications = cachedNotifications.headerNotifications.map(notification => ({
					...notification,
					read: true
				}));

				cache.writeQuery<HeaderNotificationsQuery>({
					query: HeaderNotificationsDocument,
					data: {
						headerNotifications: modifiedNotifications
					}
				});
			}
		});
	};

	const unreadNotifications = notificationsData?.headerNotifications.filter(notification => !notification.read)
		.length;

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
						<Styled.NavbarItem>
							<Box display='flex' justifyContent='center' alignItems='center' height='44px'>
								<CircularProgress size='1.5rem' color='secondary' />
							</Box>
						</Styled.NavbarItem>
					) : data?.me ? (
						<>
							<IconButton
								icon={
									unreadNotifications ? (
										<Badge badgeContent={unreadNotifications} max={9} color='secondary'>
											<NotificationsActiveIcon className='white' />
										</Badge>
									) : (
										<NotificationsIcon className='white' />
									)
								}
								onClick={e => setNotificationsAnchorEl(e.currentTarget)}
								title={unreadNotifications ? 'You have unread notifications' : ''}
								tooltip={true}
							/>
							<Styled.NavbarItem onClick={e => setProfileAnchorEl(e.currentTarget)}>
								<Avatar style={{ width: 44, height: 44 }}>
									{helpers.transformToAvatarInitials(data.me.name)}
								</Avatar>
							</Styled.NavbarItem>
						</>
					) : (
						<>
							<Styled.NavbarItem>
								<Button
									variant='outlined'
									color='secondary'
									className='bold'
									onClick={handleOnSignInClick}
								>
									Sign in
								</Button>
							</Styled.NavbarItem>
							<Styled.NavbarItem>
								<Button
									variant='contained'
									color='secondary'
									className='bold'
									onClick={handleOnSignUpClick}
								>
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
				notifications={notificationsData?.headerNotifications ?? []}
			/>
			<Dropdown
				anchor={profileAnchorEl}
				onClose={() => setProfileAnchorEl(null)}
				items={[
					{
						href: '/account',
						element: <Box fontWeight='bold'>Account</Box>,
						action: () => setProfileAnchorEl(null)
					},
					{
						href: '/account/trips',
						element: <Box fontWeight='bold'>My trips</Box>,
						action: () => setProfileAnchorEl(null)
					},
					{
						href: '/account/favorites',
						element: <Box fontWeight='bold'>My favorites</Box>,
						action: () => setProfileAnchorEl(null),
						divider: true
					},
					{
						action: handleOnSignOut,
						element: <Box fontWeight={theme.typography.fontWeightMedium}>Sign out</Box>
					}
				]}
			/>
		</Box>
	);
}

export default Header;
