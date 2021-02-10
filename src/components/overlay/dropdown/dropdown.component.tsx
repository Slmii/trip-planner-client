import { Box, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import React, { Fragment } from 'react';

import Divider from '@components/divider';
import { DropDownItemProps, DropdownProps } from '@components/overlay/dropdown';

const renderDropdownItem = ({ name, element, action }: DropDownItemProps) => {
	return (
		<Box
			as='a'
			w='100%'
			p='10px 25px'
			cursor='pointer'
			fontSize='md'
			_hover={{
				backgroundColor: 'gray.100',
				textDecoration: 'none'
			}}
			onClick={action}
		>
			{element ?? name}
		</Box>
	);
};

export default function Dropdown({ items }: DropdownProps) {
	return (
		<Flex flexDirection='column' maxHeight='250px'>
			{items.map(({ href, name, element, divider, action }, idx) => {
				return (
					<Fragment key={idx}>
						{href ? (
							<Link href={href} passHref>
								{renderDropdownItem({ name, element, action })}
							</Link>
						) : (
							renderDropdownItem({ name, element, action })
						)}
						{divider && <Divider />}
					</Fragment>
				);
			})}
		</Flex>
	);
}
