import MuiToggleButton from '@material-ui/lab/ToggleButton';
import Tooltip from '@material-ui/core/Tooltip';
import { useState } from 'react';

import { ToggleButtonProps, Styled } from '@components/buttons/toggle-button';
import { View, Rows } from '@lib/redux/filters';

const ToggleButton = ({ defaultValue, orientation = 'horizontal', size = 'medium', buttons, onChange }: ToggleButtonProps) => {
	const [value, setValue] = useState(defaultValue);

	const handleOnViewChange = (_event: React.MouseEvent<HTMLElement>, nextValue: View | Rows) => {
		if (nextValue !== null) {
			setValue(nextValue);
			onChange(nextValue);
		}
	};

	return (
		<Styled.ToggleButtonGroup orientation={orientation} size={size} exclusive value={value} onChange={handleOnViewChange}>
			{buttons.map(({ value, title, label }, idx) => (
				<MuiToggleButton key={idx} value={value} aria-label={value}>
					<Tooltip title={title} arrow>
						<>{label}</>
					</Tooltip>
				</MuiToggleButton>
			))}
		</Styled.ToggleButtonGroup>
	);
};

export default ToggleButton;
