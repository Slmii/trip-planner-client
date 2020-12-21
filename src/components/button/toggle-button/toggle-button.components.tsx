import { useState } from 'react';
const MuiToggleButton = require('@material-ui/lab/ToggleButton').default;
const Tooltip = require('@material-ui/core/Tooltip').default;

import { ToggleButtonProps } from '@lib/types';

import { ToggleButtonGroup } from './toggle-button.styled';
import { filters } from '@lib/redux';

const ToggleButton = ({ defaultValue, orientation = 'horizontal', size = 'medium', buttons, onChange }: ToggleButtonProps) => {
	const [value, setValue] = useState(defaultValue);

	const handleOnViewChange = (_event: React.MouseEvent<HTMLElement>, nextValue: filters.View | filters.Rows) => {
		if (nextValue !== null) {
			setValue(nextValue);
			onChange(nextValue);
		}
	};

	return (
		<ToggleButtonGroup orientation={orientation} size={size} exclusive value={value} onChange={handleOnViewChange}>
			{buttons.map(({ value, title, label }, idx) => (
				<MuiToggleButton key={idx} value={value} aria-label={value}>
					<Tooltip title={title} arrow>
						{label}
					</Tooltip>
				</MuiToggleButton>
			))}
		</ToggleButtonGroup>
	);
};

export default ToggleButton;
