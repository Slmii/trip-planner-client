import React from 'react';
const MuiMenu = require('@material-ui/core/Menu').default;
const ListSubheader = require('@material-ui/core/ListSubheader').default;
const MuiMenuItem = require('@material-ui/core/MenuItem').default;
const Typography = require('@material-ui/core/Typography').default;

import { MenuItem, MenuProps, MultipleMenuItem } from '@components/menu';

const Menu = ({ anchorEl, onClose, type, menu, multiple = false }: MenuProps) => {
	return (
		<MuiMenu
			id={`${type}-menu`}
			anchorEl={anchorEl}
			keepMounted
			open={Boolean(anchorEl)}
			onClose={onClose}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
			transformOrigin={{ vertical: 'top', horizontal: 'left' }}
			getContentAnchorEl={null}
			style={{
				marginTop: 5
			}}
		>
			{multiple
				? (menu as MultipleMenuItem[]).map(({ subHeader, type, menuItems }) => {
						const body: JSX.Element[] = [];

						body.push(<ListSubheader>{subHeader}</ListSubheader>);

						menuItems.forEach(({ label, value, selected, onMenuItemClick }) =>
							body.push(
								<MuiMenuItem
									key={value}
									value={`${type}-${value}`}
									onClick={() => onMenuItemClick(value)}
									selected={selected}
								>
									<Typography variant='body2'>{label}</Typography>
								</MuiMenuItem>
							)
						);

						return body;
						// eslint-disable-next-line no-mixed-spaces-and-tabs
				  })
				: (menu as MenuItem[]).map(({ label, value, selected, onMenuItemClick }) => (
						<MuiMenuItem key={value} value={value} onClick={() => onMenuItemClick(value)} selected={selected}>
							<Typography variant='body2'>{label}</Typography>
						</MuiMenuItem>
						// eslint-disable-next-line no-mixed-spaces-and-tabs
				  ))}
		</MuiMenu>
	);
};

Menu.whyDidYouRender = true;

export default React.memo(Menu);
