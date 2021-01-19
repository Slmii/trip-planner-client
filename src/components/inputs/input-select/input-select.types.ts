import React from 'react';

import { MenuItem, MultipleMenuItem } from '@components/menu';

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

type FormControlSize = 'small' | 'medium';
type SelectVariant = 'filled' | 'outlined' | 'standard';
