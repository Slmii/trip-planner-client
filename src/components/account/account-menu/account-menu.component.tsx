import Box from '@material-ui/core/Box';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { constants, Styled } from '@components/account/account-menu';
import { helpers } from '@lib/utils';

import { globalStyles } from '@styles/index';

const AccountMenu = () => {
	const router = useRouter();
	const { 1: subPath } = helpers.getCurrentRoute(router);

	const { iconMr } = globalStyles();
	const { onHover, active } = Styled.accountMenuStyles();

	return (
		<Box width='15%' display='flex' flexDirection='column' mr={2}>
			{constants.ACCOUNT_MENU.map(({ key, Icon, title }) => (
				<Link key={key} href={`/account/${key}`}>
					{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
					<a
						className={cn(onHover, {
							[active]: subPath === key
						})}
					>
						<Box padding='14px 0' display='flex' alignContent='center'>
							<Icon fontSize='small' className={iconMr} />
							{title}
						</Box>
					</a>
				</Link>
			))}
		</Box>
	);
};

export default AccountMenu;
