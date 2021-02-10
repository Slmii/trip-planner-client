import { Button as CUIButton, ButtonProps, Flex } from '@chakra-ui/react';
import React from 'react';

export default function Button({
	children,
	leftIcon,
	rightIcon,
	...props
}: ButtonProps & { children: React.ReactNode }) {
	return (
		<CUIButton
			leftIcon={leftIcon ? <Flex>{leftIcon}</Flex> : undefined}
			rightIcon={rightIcon ? <Flex>{rightIcon}</Flex> : undefined}
			{...props}
		>
			{children}
		</CUIButton>
	);
}
