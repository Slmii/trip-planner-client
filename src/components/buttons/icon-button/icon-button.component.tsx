import Tooltip from '@material-ui/core/Tooltip';
import MuiIconButton from '@material-ui/core/IconButton';

import { IconButtonProps } from '@components/buttons/icon-button';

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
