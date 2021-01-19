import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import MailIcon from '@material-ui/icons/MailOutline';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import SecurityOutlinedIcon from '@material-ui/icons/SecurityOutlined';

import { AccountMenuItem } from '@components/account/account-menu';

export const ACCOUNT_MENU: AccountMenuItem[] = [
	{
		key: 'profile',
		title: 'Profile',
		description: 'Provide my personal details and manage privacy preferences',
		Icon: AccountCircleOutlinedIcon
	},
	{
		key: 'notifications',
		title: 'Notifications',
		description: 'Manage my notifications and notification preferences',
		Icon: NotificationsIcon
	},
	{
		key: 'invitations',
		title: 'Invitations',
		description: 'Manage my received and sent invitations',
		Icon: MailIcon
	},
	{
		key: 'trips',
		title: 'My trips',
		description: 'Manage my trips, activities and preparations',
		Icon: CardTravelIcon
	},
	{
		key: 'favorites',
		title: 'My favorites',
		description: 'Manage my favorites',
		Icon: FavoriteIcon
	},
	{
		key: 'security',
		title: 'Security',
		description: 'Secure my account and update my password',
		Icon: SecurityOutlinedIcon
	}
];
