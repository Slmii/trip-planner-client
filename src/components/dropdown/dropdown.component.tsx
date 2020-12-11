import Link from 'next/link';
// import classNames from 'classnames';
import { Fragment } from 'react';

import { Divider } from '@components/divider';
import { DropdownProps, DropDownItemProps } from '@lib/types';

import * as S from './dropdown.styled';

const renderDropdownItem = ({ name, element, action }: DropDownItemProps) => {
	return <S.DropdownItem onClick={action}>{element ?? name}</S.DropdownItem>;
};

export default function Dropdown({ className, visible, items }: DropdownProps) {
	return (
		<>
			{visible && (
				<S.Dropdown className={className}>
					<S.DropdownItems>
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
					</S.DropdownItems>
				</S.Dropdown>
			)}
		</>
	);
}
