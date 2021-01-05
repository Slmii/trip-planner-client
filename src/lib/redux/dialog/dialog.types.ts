import { Severity } from '@lib/types';

export type DialogSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface DialogProps {
	open: boolean;
	title: string;
	severity: Severity;
	body?: string;
	fullWidth?: boolean;
	maxWidth?: DialogSize;
	onConfirm?: () => Promise<void> | void;
	onConfirmText?: string;
	onCancel?: () => void;
	onCancelText?: string;
}

export type DialogState = DialogProps;
