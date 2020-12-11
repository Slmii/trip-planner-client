import { Severity } from '@lib/types';

export type DialogSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type DialogProps = {
	open: boolean;
	title: string;
	severity: Severity;
	description?: string;
	fullWidth?: boolean;
	maxWidth?: DialogSize;
	onConfirm?: () => void;
	onCancel?: () => void;
};

export type DialogState = DialogProps;
