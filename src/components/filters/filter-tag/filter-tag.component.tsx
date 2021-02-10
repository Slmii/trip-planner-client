import { Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';

import { FilterTagProps } from '@components/filters/filter-tag';
import { colors } from '@lib/utils';

import theme from '@theme/index';

const FilterTag = ({ label, onClick, onClose, defaultVariant, hasValue, isPopoverOpen }: FilterTagProps) => {
	return (
		<Tag
			size='md'
			borderRadius='full'
			variant={defaultVariant ? defaultVariant : hasValue ? 'solid' : 'outline'}
			colorScheme='primary'
			cursor='pointer'
			onClick={onClick}
			_hover={{
				bg: defaultVariant
					? 'primary.600'
					: hasValue
					? 'primary.600'
					: colors.hexToRgb(theme.colors.primary[500], 0.04)
			}}
		>
			<TagLabel>{label}</TagLabel>
			<TagCloseButton
				as={onClose && hasValue ? undefined : isPopoverOpen ? MdExpandLess : MdExpandMore}
				onClick={e => {
					if (onClose && hasValue) {
						e.stopPropagation();
						onClose();
					}
				}}
			/>
		</Tag>
	);
};

export default FilterTag;
