import Link from 'next/link';
// import classNames from 'classnames';
import { Fragment } from 'react';

import Divider from '@components/divider';
import { DropdownProps, DropDownItemProps, Styled } from '@components/dropdown';

const renderDropdownItem = ({ name, element, action }: DropDownItemProps) => {
	return <Styled.DropdownItem onClick={action}>{element ?? name}</Styled.DropdownItem>;
};

export default function Dropdown({ className, visible, items }: DropdownProps) {
	return (
		<>
			{visible && (
				<Styled.Dropdown className={className}>
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
				</Styled.Dropdown>
			)}
		</>
	);
}
