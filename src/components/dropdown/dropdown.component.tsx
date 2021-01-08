import Link from 'next/link';
import { Fragment } from 'react';

import Popover from '@components/popover';
import Divider from '@components/divider';
import { DropdownProps, DropDownItemProps, Styled } from '@components/dropdown';

const renderDropdownItem = ({ name, element, action }: DropDownItemProps) => {
	return <Styled.DropdownItem onClick={action}>{element ?? name}</Styled.DropdownItem>;
};

export default function Dropdown({ anchor, items, onClose }: DropdownProps) {
	return (
		<Popover anchorEl={anchor} type='profile' onClose={onClose} position='center'>
			<Styled.DropdownItems>
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
			</Styled.DropdownItems>
		</Popover>
	);
}
