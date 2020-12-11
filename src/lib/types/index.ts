import { ReactNode } from 'react';
import { FieldInputProps } from 'formik';

import { MeFragment, PreparationFragment, Trip } from '@generated/graphql';
import { filters } from '@lib/redux';

type WithChildren<T = Record<string, unknown>> = T & { children?: ReactNode };

// Component Types
export type DropdownProps = {
	className?: string;
	visible: boolean;
	items: DropdownItems[];
};

type DropdownItems = {
	name?: string;
	element?: JSX.Element;
	href?: string;
	divider?: boolean;
	action?: () => Promise<void> | void;
};

export type DropDownItemProps = {
	name?: string;
	element?: JSX.Element;
	action?: () => Promise<void> | void;
};

export type FormInputFieldProps = {
	name: string;
	label?: string;
	type?: string;
	required?: boolean;
	disabled?: boolean;
	strengthMeter?: boolean;
	optional?: boolean;
	multiline?: boolean;
	rows?: number;
	placeholder?: string;
	size?: InputSize;
	startAdornment?: JSX.Element;
};

export type InputFieldProps = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	field?: FieldInputProps<any>;
	value?: string;
	name?: string;
	label?: string;
	type?: string;
	required?: boolean;
	disabled?: boolean;
	error?: string;
	touched?: boolean;
	strengthMeter?: boolean;
	passwordStrength?: string;
	optional?: boolean;
	multiline?: boolean;
	fullWidth?: boolean;
	rows?: number;
	placeholder?: string;
	size?: InputSize;
	startAdornment?: JSX.Element;
	endAdornment?: JSX.Element;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onFocus?: (event: React.FocusEvent) => void;
	onFocusOut?: (event: React.FocusEvent) => void;
};

export type InputSelectProps = {
	value: string;
	menuItems: MenuItem[];
	label?: string;
	autoWidth?: boolean;
	multiple?: boolean;
	native?: boolean;
	variant?: SelectVariant;
	size?: FormControlSize;
	minWidth?: number;
	fullWidth?: boolean;
	required?: boolean;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type MenuItem = {
	value: string;
	label: JSX.Element | string;
};

export interface ButtonProps extends WithChildren {
	type?: ButtonType;
	color?: Color;
	variant?: ButtonVariant;
	size?: Size;
	loading?: boolean;
	fullWidth?: boolean;
	disabled?: boolean;
	startIcon?: JSX.Element;
	endIcon?: JSX.Element;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	className?: string;
}

export type CardProps = {
	trip: Trip;
	isUpcomingTrip: boolean;
	isSelected: boolean;
	isCreator: boolean;
	isDeleteAvailable: boolean;
	onDelete: (tripId: number) => void;
	onView: (tripId: number) => void;
	onAddFavorite: (tripId: number) => void;
	onDeleteFavorite: (tripId: number) => void;
	onClose: () => void;
};

export type ToggleButtonProps = {
	defaultValue: string;
	buttons: { value: string; title: string; label: string | JSX.Element }[];
	onChange: (value: filters.View | filters.Rows) => void;
	size?: Size;
	orientation?: 'vertical' | 'horizontal';
};

export type TripsProps = {
	trips: Trip[];
	loading: boolean;
	pageName: string;
	totalCount: number;
};

export type PaginationProps = {
	page: number;
	count: number;
	onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
};

export type IconButtonProps = {
	title: string;
	icon: JSX.Element;
	tooltip?: boolean;
	onClick?: (event: React.KeyboardEvent | React.MouseEvent) => void;
	color?: 'primary' | 'secondary' | 'error';
};

export type TripSummaryProps = {
	tripId: number;
	me?: MeFragment | null;
	onClose: () => void;
};

export type PreparationProps = {
	preparation: PreparationFragment;
	onDelete: (preparationId: number) => void;
	onStatusChange: (preparationId: number) => void;
};

export type MenuItemOnClick<T> = {
	label: string;
	value: T;
};

export type MenuProps = {
	anchorEl: HTMLElement | null;
	type: string;
	menu: {
		menuItems: MenuItem[];
		subHeader?: string;
		onMenuItemClick?: (value: string) => void;
	}[];
	onClose?: () => void;
};

// End Component Types

// Formik Types
export type SignInInitialValues = {
	email: string;
	password: string;
};

export type SignUpInitialValues = {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
	confirmPassword: string;
};
// End Formik Types

export type ButtonVariant = 'contained' | 'outlined' | 'text';
export type ButtonType = 'submit' | 'button' | 'reset';
export type SelectVariant = 'filled' | 'outlined' | 'standard';
export type Color = 'inherit' | 'default' | 'primary' | 'secondary';
export type Size = 'small' | 'medium' | 'large';
export type FormControlSize = 'small' | 'medium';
export type InputSize = 'small' | 'medium';
export type Severity = 'error' | 'warning' | 'success' | 'info';
export type ActivityType = 'hiking' | 'beach' | 'tour' | 'nature';
export type TransportationType = 'taxi' | 'bus' | 'foot' | 'motorcycle';

export type User = {
	userId: number;
	role: string;
};
