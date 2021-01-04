/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import Image from 'next/image';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { useTheme } from '@material-ui/core/styles';

import Button from '@components/buttons/button';
import IconButton from '@components/buttons/icon-button';
import Dropdown from '@components/dropdown';
import { Styled } from '@components/common/header';
import { useOutsideClick } from '@lib/hooks';
import { useMeQuery, useSignOutMutation } from '@generated/graphql';

import { Theme } from '@theme/index';

function Header() {
	const profileMenuRef = useRef<HTMLDivElement | null>(null);
	const [visible, setVisible] = useState<boolean>(false);

	const apolloClient = useApolloClient();
	const router = useRouter();
	const theme: Theme = useTheme();
	useOutsideClick(profileMenuRef, () => setVisible(false));
	const [signOut, { loading: signOutLoading }] = useSignOutMutation();
	const { data, loading: meLoading, error } = useMeQuery();

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
						<a className='bold white'>
							<Image src='/assets/logo.png' width={200} height={60} />
						</a>
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
							<Styled.NavbarItem>
								<IconButton
									icon={
										<Styled.PulseBadge
											overlap='circle'
											anchorOrigin={{
												vertical: 'top',
												horizontal: 'right'
											}}
											variant='dot'
										>
											<NotificationsActiveIcon className='white' />
										</Styled.PulseBadge>
									}
									title='Notifications'
									tooltip={true}
								/>
							</Styled.NavbarItem>
							<Styled.NavbarItem ref={profileMenuRef} onClick={() => setVisible(!visible)}>
								<Avatar style={{ width: 44, height: 44 }}>
									{data.me.name
										.split(' ')
										.map(n => n[0])
										.join('')}
								</Avatar>
								<Dropdown
									visible={visible}
									items={[
										// {
										// 	href: '/notifications',
										// 	element: (
										// 		<Box display='flex'>
										// 			<Box fontWeight='bold'>Notifications</Box>
										// 			<Styled.Badge color='secondary' badgeContent={badgeCount} max={99} />
										// 		</Box>
										// 	)
										// },
										{
											href: '/account',
											element: <Box fontWeight='bold'>My account</Box>
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
											action: handleOnSignOut,
											element: <Box>Sign out</Box>
										}
									]}
								/>
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
		</Box>
	);
}

export default Header;
