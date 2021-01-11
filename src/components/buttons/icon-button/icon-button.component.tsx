import MuiIconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import cn from 'classnames';

import { IconButtonProps, Styled } from '@components/buttons/icon-button';

import theme from '@theme/index';

const IconButton = ({ tooltip = false, title, onClick, color, icon, disabled = false }: IconButtonProps) => {
	const { isDisabled } = Styled.iconButtonStyles();
	return (
		<>
			{tooltip ? (
				<Tooltip title={title} arrow>
					<MuiIconButton
						aria-label={title.toLowerCase()}
						style={{ color: color ? theme.palette[color].main : 'inherit' }}
						onClick={onClick}
						className={cn({
							[isDisabled]: disabled
						})}
					>
						{icon}
					</MuiIconButton>
				</Tooltip>
			) : (
				<MuiIconButton
					aria-label={title.toLowerCase()}
					style={{ color: color ? theme.palette[color].main : 'inherit' }}
					onClick={onClick}
					className={cn({
						[isDisabled]: disabled
					})}
				>
					{icon}
				</MuiIconButton>
			)}
		</>
	);
};

export default IconButton;
