import { IconButton as CUIIconButton, Tooltip } from '@chakra-ui/react';

import { IconButtonProps } from '@components/buttons/icon-button';

const IconButton = ({
	tooltip = false,
	title,
	onClick,
	size = 'lg',
	colorScheme = 'primary',
	icon,
	disabled = false
}: IconButtonProps) => {
	return (
		<>
			{tooltip ? (
				<Tooltip label={title} hasArrow fontSize='sm' shouldWrapChildren>
					<CUIIconButton
						colorScheme={colorScheme}
						aria-label={title}
						variant='outline'
						icon={icon}
						isRound={true}
						border='none'
						boxShadow='none'
						onClick={onClick}
						disabled={disabled}
						size={size}
					/>
				</Tooltip>
			) : (
				<CUIIconButton
					colorScheme={colorScheme}
					aria-label={title}
					variant='outline'
					icon={icon}
					isRound={true}
					border='none'
					boxShadow='none'
					onClick={onClick}
					disabled={disabled}
					size={size}
				/>
			)}
		</>
	);
};

export default IconButton;
