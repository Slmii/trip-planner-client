import { Box, Flex, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import AccountMenu, { constants } from '@components/account/account-menu';
import AccountTitle from '@components/account/account-title';
import Favorites from '@components/account/favorites';
import Notifications from '@components/account/notifications';
import Profile from '@components/account/profile';
import Trips from '@components/account/trips';
import Layout from '@components/common/layout';
import Icon from '@components/icon';
import Paper from '@components/paper';
import { withApollo } from '@lib/apollo';
import { url } from '@lib/utils';

import spacing from '@theme/spacing';

const PAGE_COMPONENT: Record<string, JSX.Element> = {
	trips: <Trips />,
	favorites: <Favorites />,
	notifications: <Notifications />,
	profile: <Profile />
};

function AccountPage() {
	const router = useRouter();
	const { 1: subPath } = url.getCurrentRoute(router);

	return (
		<Layout>
			<Box width='100%'>
				{Object.keys(PAGE_COMPONENT).includes(subPath) ? (
					<Flex>
						<AccountMenu />
						<VStack spacing={spacing.BODY_SPACING} width='calc(85% - 32px)' align='stretch'>
							{Object.keys(PAGE_COMPONENT).includes(subPath) && PAGE_COMPONENT[subPath]}
						</VStack>
					</Flex>
				) : (
					<VStack spacing={spacing.BODY_SPACING} align='stretch'>
						<AccountTitle heading='Account' subHeading='Manage my environment' />
						<SimpleGrid columns={3} spacing={spacing.CARD}>
							{constants.ACCOUNT_MENU.map(({ Icon: AccountMenuIcon, description, key, title }) => (
								<Link key={key} href={`/account/${key}`}>
									<Box
										as='a'
										_hover={{
											textDecoration: 'none !important',
											color: 'primary.500'
										}}
										minH='160px'
									>
										<Paper height='100%' p={spacing.INNER_PADDING}>
											<Flex flexDirection='column'>
												<Flex mb={4} alignItems='center'>
													<Icon as={AccountMenuIcon} size='lg' mr />
													<Text textStyle='title'>{title}</Text>
												</Flex>
												<Text textStyle='body'>{description}</Text>
											</Flex>
										</Paper>
									</Box>
								</Link>
							))}
						</SimpleGrid>
					</VStack>
				)}
			</Box>
		</Layout>
	);
}

export default withApollo({ ssr: true })(AccountPage);
