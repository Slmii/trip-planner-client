export interface MenuProps {
	anchorEl: HTMLElement | null;
	type: string;
	menu?: MultipleMenuItem[] | MenuItem[];
	onClose?: () => void;
	multiple?: boolean;
}

export interface MenuItem {
	value: string;
	label: JSX.Element | string;
	onMenuItemClick: (value: string) => void;
	selected?: boolean;
}

export interface MultipleMenuItem {
	menuItems: MenuItem[];
	type: string;
	subHeader: string;
}
