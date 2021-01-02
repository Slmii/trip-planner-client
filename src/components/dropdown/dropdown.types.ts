export interface DropdownProps {
	className?: string;
	visible: boolean;
	items: DropdownItems[];
}

interface DropdownItems {
	name?: string;
	element?: JSX.Element;
	href?: string;
	divider?: boolean;
	action?: () => Promise<void> | void;
}

export interface DropDownItemProps {
	name?: string;
	element?: JSX.Element;
	action?: () => Promise<void> | void;
}
