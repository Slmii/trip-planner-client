import { Box } from '@chakra-ui/react';
import React from 'react';

const NavbarItem = ({
	onClick,
	children
}: {
	onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	children: React.ReactNode;
}) => {
	return (
		<Box m={3} onClick={e => onClick?.(e)}>
			{children}
		</Box>
	);
};

export default NavbarItem;
