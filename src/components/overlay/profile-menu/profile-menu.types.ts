export interface ProfileMenuProps {
	button: JSX.Element;
	isOpen: boolean;
	onClose: () => void;
	items: ProfileMenuItems[];
	placement?:
		| 'top'
		| 'right'
		| 'bottom'
		| 'left'
		| 'auto'
		| 'auto-start'
		| 'auto-end'
		| 'top-start'
		| 'top-end'
		| 'bottom-start'
		| 'bottom-end'
		| 'right-start'
		| 'right-end'
		| 'left-start'
		| 'left-end';
}

interface ProfileMenuItems {
	element: JSX.Element;
	href?: string;
	divider?: boolean;
}
