/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { useTheme } from '@material-ui/core/styles';

import Button from '@components/buttons/button';
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
					<Styled.NavbarItem>
						<Link href='/search'>
							<a className='bold white' title='Look for trips'>
								Look for trips
							</a>
						</Link>
					</Styled.NavbarItem>
					<Styled.NavbarItem>
						<Link href='/planner'>
							<a className='bold white' title='Planner'>
								Plan a trip
							</a>
						</Link>
					</Styled.NavbarItem>
					{meLoading || signOutLoading ? (
						<Box display='flex' justifyContent='center' alignItems='center' width='100px' ml={0.75}>
							<CircularProgress size='1.5rem' color='secondary' />
						</Box>
					) : data?.me ? (
						<Styled.NavbarItem ref={profileMenuRef} onClick={() => setVisible(!visible)}>
							<Styled.PulseBadge
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
							</Styled.PulseBadge>
							<Dropdown
								visible={visible}
								items={[
									{
										href: '/notifications',
										element: (
											<Box display='flex'>
												<Box fontWeight='bold'>Notifications</Box>
												<Styled.Badge color='secondary' badgeContent={badgeCount} max={99} />
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
						</Styled.NavbarItem>
					) : (
						<>
							<Styled.NavbarItem>
								<Button variant='outlined' color='secondary' size='large' className='bold' onClick={handleOnSignInClick}>
									Sign in
								</Button>
							</Styled.NavbarItem>
							<Styled.NavbarItem>
								<Button
									variant='contained'
									color='secondary'
									size='large'
									className='bold white'
									onClick={handleOnSignUpClick}
								>
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
