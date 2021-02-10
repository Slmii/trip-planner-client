import {
    Menu as CUIMenu,
    MenuButton,
    MenuItem,
    MenuItemOption,
    MenuList,
    MenuOptionGroup,
    Portal,
    Text
} from '@chakra-ui/react';

import Icon from '@components/icon';
import { MenuProps } from '@components/overlay/menu';

const Menu = ({ button, options }: MenuProps) => {
	return (
		<CUIMenu autoSelect={false} closeOnSelect={options.closeOnSelect}>
			{({ isOpen }) => (
				<>
					<MenuButton
						sx={{
							'> span': {
								pointerEvents: 'all'
							}
						}}
					>
						{button({ isOpen })}
					</MenuButton>
					<Portal>
						<MenuList fontSize='md' boxShadow='base'>
							{options.groups ? (
								<>
									{options.groups.map((group, idx) => (
										<MenuOptionGroup
											key={idx}
											defaultValue={group.defaultValue}
											title={group.title}
											type={group.type}
											onChange={value => group.onChange(value as string)}
										>
											{group.items.map((item, idx) => {
												const isSelected = group.defaultValue === item.value;

												return (
													<MenuItemOption
														key={idx}
														value={item.value}
														color={isSelected ? 'primary.500' : undefined}
													>
														<Text
															textStyle='body'
															fontWeight={isSelected ? 'bold' : undefined}
														>
															{item.label}
														</Text>
													</MenuItemOption>
												);
											})}
										</MenuOptionGroup>
									))}
								</>
							) : null}
							{options.items ? (
								<>
									{options.items.map(({ value, label, Icon: MenuIcon, onClick, isSelected }, idx) => (
										<MenuItem
											key={idx}
											icon={MenuIcon && <Icon as={MenuIcon} size='sm' />}
											onClick={() => onClick(value)}
											color={isSelected ? 'primary.500' : undefined}
											fontWeight={isSelected ? 'bold' : undefined}
										>
											{label}
										</MenuItem>
									))}
								</>
							) : null}
						</MenuList>
					</Portal>
				</>
			)}
		</CUIMenu>
	);
};

export default Menu;
