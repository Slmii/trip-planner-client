const Tooltip = require('@material-ui/core/Tooltip').default;
const MuiIconButton = require('@material-ui/core/IconButton').default;

import { IconButtonProps } from '@lib/types';

import theme from '@theme/index';

const IconButton = ({ tooltip = false, title, onClick, color, icon }: IconButtonProps) => {
	return (
		<>
			{tooltip ? (
				<Tooltip title={title} arrow>
					<MuiIconButton
						aria-label={title.toLowerCase()}
						style={{ color: color ? theme.palette[color].main : 'inherit' }}
						onClick={onClick}
					>
						{icon}
					</MuiIconButton>
				</Tooltip>
			) : (
				<MuiIconButton
					aria-label={title.toLowerCase()}
					style={{ color: color ? theme.palette[color].main : 'inherit' }}
					onClick={onClick}
				>
					{icon}
				</MuiIconButton>
			)}
		</>
	);
};

export default IconButton;
