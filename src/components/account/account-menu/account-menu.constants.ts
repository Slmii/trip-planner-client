import { HiOutlineUserCircle } from 'react-icons/hi';
import {
    MdCardTravel,
    MdFavoriteBorder,
    MdMailOutline,
    MdNotificationsNone,
    MdSecurity
} from 'react-icons/md';

import { AccountMenuItem } from '@components/account/account-menu';

export const ACCOUNT_MENU: AccountMenuItem[] = [
	{
		key: 'profile',
		title: 'Profile',
		description: 'Provide my personal details and manage my privacy preferences',
		Icon: HiOutlineUserCircle
	},
	{
		key: 'notifications',
		title: 'Notifications',
		description: 'Manage my notifications and notification preferences',
		Icon: MdNotificationsNone
	},
	{
		key: 'invitations',
		title: 'Invitations',
		description: 'Manage my received and sent invitations',
		Icon: MdMailOutline
	},
	{
		key: 'trips',
		title: 'My trips',
		description: 'Manage my trips, activities and preparations',
		Icon: MdCardTravel
	},
	{
		key: 'favorites',
		title: 'My favorites',
		description: 'Manage my favorites',
		Icon: MdFavoriteBorder
	},
	{
		key: 'security',
		title: 'Security',
		description: 'Secure my account and update my password',
		Icon: MdSecurity
	}
];
