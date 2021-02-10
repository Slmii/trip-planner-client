import { IconType } from 'react-icons/lib';

interface GroupedItem {
	label: string;
	value: string;
	onClick?: never;
	Icon?: never;
	isSelected?: never;
}

interface MenuItemOptionsGroup {
	groups: Array<{
		title: string;
		type: 'radio' | 'checkbox';
		defaultValue: string;
		items: GroupedItem[];
		onChange: (value: string) => void;
	}>;
	closeOnSelect: boolean;
	items?: never;
}

interface SingleItem {
	label: string;
	value: string;
	onClick: (value: string) => void;
	isSelected: boolean;
	Icon?: IconType;
}

interface MenuItem {
	items: SingleItem[];
	groups?: never;
	closeOnSelect?: never;
}

type MenuItemProps = MenuItemOptionsGroup | MenuItem;

export interface MenuProps {
	button: ({ isOpen }: { isOpen: boolean }) => JSX.Element;
	options: MenuItemProps;
}
