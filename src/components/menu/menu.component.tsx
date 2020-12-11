import { Fragment } from 'react';
const MuiMenu = require('@material-ui/core/Menu').default;
const ListSubheader = require('@material-ui/core/ListSubheader').default;
const MuiMenuItem = require('@material-ui/core/MenuItem').default;
const Typography = require('@material-ui/core/Typography').default;

import { MenuProps } from '@lib/types';

const Menu = ({ anchorEl, onClose, type, menu }: MenuProps) => {
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
		>
			{menu.map(({ subHeader, onMenuItemClick, menuItems }) => {
				const body: JSX.Element[] = [];

				if (subHeader) {
					body.push(<ListSubheader>{subHeader}</ListSubheader>);
				}

				menuItems.forEach(({ label, value }) =>
					body.push(
						<MuiMenuItem key={value} onClick={() => onMenuItemClick?.(value)}>
							<Typography variant='body2'>{label}</Typography>
						</MuiMenuItem>
					)
				);

				return body;
			})}
		</MuiMenu>
	);
};

export default Menu;
