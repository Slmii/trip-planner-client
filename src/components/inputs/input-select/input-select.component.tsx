const FormControl = require('@material-ui/core/FormControl').default;
const InputLabel = require('@material-ui/core/InputLabel').default;
const MenuItem = require('@material-ui/core/MenuItem').default;
const Typography = require('@material-ui/core/Typography').default;
const Chip = require('@material-ui/core/Chip').default;

import { InputSelectProps } from '@lib/types';

import { Select } from './input-select.styled';

const InputSelect = ({
	value,
	menuItems,
	label,
	autoWidth = false,
	multiple = false,
	native = false,
	variant = 'outlined',
	size = 'medium',
	minWidth = 0,
	fullWidth = false,
	required = false,
	onChange
}: InputSelectProps) => {
	const labelId = label ? `select-${label.toLowerCase().replace(' ', '-')}-label` : '';
	const id = label ? `select-${label.toLowerCase().replace(' ', '-')}` : '';

	return (
		<FormControl variant={variant} style={{ minWidth }} size={size} fullWidth={fullWidth} required={required}>
			<InputLabel id={labelId}>{label}</InputLabel>
			<Select
				labelId={labelId}
				id={id}
				value={value}
				onChange={onChange}
				label={label}
				autoWidth={autoWidth}
				multiple={multiple}
				native={native}
				renderValue={(selected: string) => <Chip label={selected} />}
				MenuProps={{
					anchorOrigin: {
						vertical: 'bottom',
						horizontal: 'left'
					},
					transformOrigin: {
						vertical: 'top',
						horizontal: 'left'
					},
					getContentAnchorEl: null
				}}
			>
				{menuItems.map(({ value, label }, idx) => (
					<MenuItem key={idx} value={value}>
						<Typography variant='body2'>{label}</Typography>
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default InputSelect;
