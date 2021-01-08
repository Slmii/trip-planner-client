import { WithChildren } from '@lib/types';

export interface PopoverProps extends WithChildren {
	type: string;
	anchorEl: null | HTMLElement | Element;
	onClose: (type: string) => void;
	position?: 'left' | 'right' | 'center';
}
