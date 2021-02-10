type TagVariant = 'subtle' | 'solid' | 'outline';

export interface FilterTagProps {
	label: string;
	onClick?: () => void;
	onClose?: () => void;
	isPopoverOpen?: boolean;
	/**
	 * Set a default variant for the tag. If set, variant will not switch depending on
	 * if the tag has a value or not.
	 */
	defaultVariant?: TagVariant;
	/**
	 * - Switch variant between `outline` and `solid` depending on if tag has value.
	 * If `defaultVariant` is provided then the switch will be ignored.
	 *
	 * - Switch beteen expand and close icon depending on if tag has value.
	 */
	hasValue?: boolean;
}
