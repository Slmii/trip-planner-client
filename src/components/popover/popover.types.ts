import { WithChildren } from '@lib/types';

export interface PopoverProps extends WithChildren {
	type: string;
	anchorEl: null | HTMLElement;
	onClose: (type: string) => void;
}
