const FormControl = require('@material-ui/core/FormControl').default;
const InputLabel = require('@material-ui/core/InputLabel').default;
const MuiMenuItem = require('@material-ui/core/MenuItem').default;
const Typography = require('@material-ui/core/Typography').default;
const ListSubheader = require('@material-ui/core/ListSubheader').default;

import { InputSelectProps, Styled } from '@components/inputs/input-select';
import { MenuItem, MultipleMenuItem } from '@components/menu';

const InputSelect = ({
	value,
	menu,
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
			<Styled.Select
				labelId={labelId}
				id={id}
				value={value}
				onChange={onChange}
				label={label}
				autoWidth={autoWidth}
				multiple={multiple}
				native={native}
				renderValue={(selected: string | string[]) => {
					if (Array.isArray(selected)) {
						return selected
							.map(selected => {
								const [type, value] = selected.split('-');

								const foundMenu = (menu as MultipleMenuItem[]).find(menu => menu.type === type);
								const foundMenuItem = foundMenu?.menuItems.find(menuItem => menuItem.value === value);

								return foundMenuItem?.label;
							})
							.join(', ');
					}

					return selected;
				}}
				// renderValue={(selected: string | string[]) => {
				// 	if (Array.isArray(selected)) {
				// 		return selected.map(selected => {
				// 			const [type, value] = selected.split('-');

				// 			const foundMenu = (menu as MultipleMenuItem[]).find(menu => menu.type === type);
				// 			const foundMenuItem = foundMenu?.menuItems.find(menuItem => menuItem.value === value);

				// 			const label = `${foundMenu?.subHeader}: ${foundMenuItem?.label}`;

				// 			const optionalChipsProps: OptionalChipsProps = {};

				// 			if (onRenderedValueDelete) {
				// 				optionalChipsProps.onDelete = type => onRenderedValueDelete(type);
				// 			}

				// 			return (
				// 				<Chip
				// 					key={selected}
				// 					className={buttonMr}
				// 					label={label}
				// 					variant='outlined'
				// 					color='primary'
				// 					size={size}
				// 					onMouseDown={(event: React.MouseEvent) => event.stopPropagation()}
				// 					{...optionalChipsProps}
				// 				/>
				// 			);
				// 		});
				// 	}

				// 	const label = (menu as MenuItem[]).find(({ value }) => value === selected)?.label;

				// 	return <Typography variant='body2'>{label}</Typography>;
				// }}
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
				{multiple
					? (menu as MultipleMenuItem[]).map(({ subHeader, type, menuItems }) => {
							const body: JSX.Element[] = [];

							body.push(<ListSubheader>{subHeader}</ListSubheader>);

							menuItems.forEach(({ label, value }) =>
								body.push(
									<MuiMenuItem key={value} value={`${type}-${value}`}>
										<Typography variant='body2'>{label}</Typography>
									</MuiMenuItem>
								)
							);

							return body;
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  })
					: (menu as MenuItem[]).map(({ label, value }) => (
							<MuiMenuItem key={value} value={value}>
								<Typography variant='body2'>{label}</Typography>
							</MuiMenuItem>
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  ))}
			</Styled.Select>
		</FormControl>
	);
};

export default InputSelect;
