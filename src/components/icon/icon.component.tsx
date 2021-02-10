import { Icon as CUIIcon } from '@chakra-ui/react';

import { IconProps } from '@components/icon';

const ICON_SIZE = {
	xs: 2,
	sm: 4,
	md: 6,
	lg: 8,
	xl: 10
};

const Icon = ({ as, size = 'md', color, mr = false, ml = false }: IconProps) => {
	return (
		<CUIIcon
			as={as}
			w={ICON_SIZE[size]}
			h={ICON_SIZE[size]}
			color={color && color !== 'black' && color !== 'white' ? `${color}.500` : color}
			mr={mr ? 2 : 0}
			ml={ml ? 2 : 0}
		/>
	);
};

export default Icon;
