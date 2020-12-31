import { ReactNode } from 'react';
import { FieldInputProps } from 'formik';

import { IFiltersState } from '@components/filters';
import { filters } from '@lib/redux';
import { MeFragment, PreparationFragment, Trip } from '@generated/graphql';

export type WithChildren<T = Record<string, unknown>> = T & { children?: ReactNode };

// Component Types
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

export interface FormInputFieldProps {
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
}

export interface InputFieldProps {
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
}

export interface InputSelectProps {
	value: string | string[];
	menu: MultipleMenuItem[] | MenuItem[];
	label?: string;
	autoWidth?: boolean;
	multiple?: boolean;
	native?: boolean;
	variant?: SelectVariant;
	size?: FormControlSize;
	minWidth?: number;
	fullWidth?: boolean;
	required?: boolean;
	onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface MenuItem {
	value: string;
	label: JSX.Element | string;
	onMenuItemClick: (value: string) => void;
	selected?: boolean;
}

export interface MultipleMenuItem {
	menuItems: MenuItem[];
	type: string;
	subHeader: string;
}

export interface ButtonProps extends WithChildren {
	type?: ButtonType;
	color?: Color | 'error';
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

export interface CardProps {
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
}

export interface ToggleButtonProps {
	defaultValue: string;
	buttons: { value: string; title: string; label: string | JSX.Element }[];
	onChange: (value: filters.View | filters.Rows) => void;
	size?: Size;
	orientation?: 'vertical' | 'horizontal';
}

export interface TripsProps {
	trips: Trip[];
	loading: boolean;
	pageName: string;
	totalCount: number;
}

export interface IconButtonProps {
	title: string;
	icon: JSX.Element;
	tooltip?: boolean;
	onClick?: (event: React.KeyboardEvent | React.MouseEvent) => void;
	color?: 'primary' | 'secondary' | 'error';
}

export interface TripSummaryProps {
	tripId: number;
	me?: MeFragment | null;
	onClose: () => void;
}

export interface PreparationProps {
	preparation: PreparationFragment;
	onDelete: (preparationId: number) => void;
	onStatusChange: (preparationId: number) => void;
}

export interface MenuItemOnClick<T> {
	label: string;
	value: T;
}

export interface MenuProps {
	anchorEl: HTMLElement | null;
	type: string;
	menu?: MultipleMenuItem[] | MenuItem[];
	onClose?: () => void;
	multiple?: boolean;
}

// End Component Types

// Formik Types
export interface SignInInitialValues {
	email: string;
	password: string;
}

export interface SignUpInitialValues {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
	confirmPassword: string;
}
// End Formik Types

// Rest

export interface FiltersRouterQueryObject {
	filters: IFiltersState;
	queryString?: KeyOf<IFiltersState>;
	value?: ValueOf<IFiltersState>;
	removeQueryStrings?: Array<KeyOf<IFiltersState>>;
}

// End Rest

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
export type ValueOf<T> = T[keyof T];
export type KeyOf<T> = keyof T;

export interface User {
	userId: number;
	role: string;
}
