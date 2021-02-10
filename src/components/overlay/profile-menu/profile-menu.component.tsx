import { Link, Menu as CUIMenu, MenuButton, MenuDivider, MenuItem, MenuList, Portal } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';

import { ProfileMenuProps } from '@components/overlay/profile-menu';

const ProfileMenu = ({ isOpen, onClose, button, items, placement = 'bottom' }: ProfileMenuProps) => {
	return (
		<CUIMenu isOpen={isOpen} onClose={onClose} placement={placement} autoSelect={false}>
			<MenuButton>{button}</MenuButton>
			<Portal>
				<MenuList fontSize='sm'>
					{items.map(({ element, href, divider }, idx) => (
						<React.Fragment key={idx}>
							{href ? (
								<NextLink href={href} passHref>
									<MenuItem as={Link}>{element}</MenuItem>
								</NextLink>
							) : (
								<MenuItem>{element}</MenuItem>
							)}
							{divider && <MenuDivider />}
						</React.Fragment>
					))}
				</MenuList>
			</Portal>
		</CUIMenu>
	);
};

export default ProfileMenu;
