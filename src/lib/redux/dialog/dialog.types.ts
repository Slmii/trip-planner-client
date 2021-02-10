import { Severity } from '@lib/types';

export type DialogSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | 'full';

export interface DialogProps {
	open: boolean;
	title: string;
	severity: Severity;
	body?: string;
	size?: DialogSize;
	onConfirm?: () => Promise<void> | void;
	onConfirmText?: string;
	onCancel?: () => void;
	onCancelText?: string;
}

export type DialogState = DialogProps;
