import { Box } from '@chakra-ui/react';

import Button from '@components/buttons/button';

const ExploreItem = ({
	name,
	isPage,
	icon,
	onNavigation
}: {
	name: 'trips' | 'activities';
	isPage: boolean;
	icon: JSX.Element;
	onNavigation: (name: string) => void;
}) => {
	return (
		<Box
			borderBottomWidth={3}
			borderStyle='solid'
			borderColor={isPage ? 'secondary.500' : 'transparent'}
			padding='13px 10px 10px 10px'
			onClick={() => onNavigation(name)}
		>
			<Button
				variant='link'
				color={isPage ? 'secondary.500' : 'white'}
				_hover={{
					color: 'secondary.500',
					textDecoration: 'none'
				}}
				leftIcon={icon}
			>
				Explore {name}
			</Button>
		</Box>
	);
};

export default ExploreItem;
