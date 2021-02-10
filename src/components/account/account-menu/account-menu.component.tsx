import { Box, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { constants } from '@components/account/account-menu';
import Icon from '@components/icon';
import { url } from '@lib/utils';

const AccountMenu = () => {
	const router = useRouter();
	const { 1: subPath } = url.getCurrentRoute(router);

	return (
		<Flex width='15%' flexDirection='column' mr={8}>
			{constants.ACCOUNT_MENU.map(({ key, Icon: AccountMenuIcon, title }) => (
				<Link key={key} href={`/account/${key}`}>
					<Box
						as='a'
						color={subPath === key ? 'primary.500' : 'text'}
						_hover={{
							textDecoration: 'none !important',
							color: 'primary.500'
						}}
					>
						<Flex py='14px' alignContent='center'>
							<Icon as={AccountMenuIcon} mr />
							{title}
						</Flex>
					</Box>
				</Link>
			))}
		</Flex>
	);
};

export default AccountMenu;
