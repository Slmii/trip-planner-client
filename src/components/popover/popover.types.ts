import { WithChildren } from '@lib/types';

export interface IPopoverProps extends WithChildren {
	type: string;
	anchorEl: null | HTMLElement;
	onClose: (type: string) => void;
}
