export interface EmailFormProps {
	value: string;
	emailInvitations: string[];
	maxInvitations: number;
	error?: string;
	loading: boolean;
	onClose: () => void;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onChipAdd: (event: React.KeyboardEvent<Element>) => void;
	onChipDelete: (email: string) => void;
	onConfirm: () => void;
}
