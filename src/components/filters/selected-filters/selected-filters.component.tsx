const Box = require('@material-ui/core/Box').default;
const Chip = require('@material-ui/core/Chip').default;

import { SelectedFiltersProps } from './selected-filters.types';
import { ChipsPrefixMapping, CHIPS_PREFIX_MAPPING, FiltersState, ORDER_BY_VALUES, SORT_BY_VALUES } from '@components/filters';
import { KeyOf } from '@lib/types';

import { globalStyles } from '@styles/global-styled';

const SelectedFilters = ({ filters, onDelete, activityTypes, transportationTypes }: SelectedFiltersProps) => {
	const { buttonMr, buttonMb } = globalStyles();

	return (
		<Box display='flex' flexWrap='wrap'>
			{Object.entries(filters).map(([key, value]) => {
				if (value) {
					let typeName = value;

					const isSortOrder = key === 'sort' || key === 'order';
					const isType = key === 'activityType' || key === 'transportationType';

					if (isType) {
						typeName =
							activityTypes?.find(({ type }) => type === value)?.name ??
							transportationTypes?.find(({ type }) => type === value)?.name;
					} else if (isSortOrder) {
						typeName = [...SORT_BY_VALUES, ...ORDER_BY_VALUES].find(item => item.value === value)?.label;
					}

					const label = `${CHIPS_PREFIX_MAPPING[key as KeyOf<ChipsPrefixMapping>]}: ${typeName}`;

					const conditionalProps: { onDelete?: () => void } = {};

					if (!isSortOrder) {
						conditionalProps.onDelete = () => onDelete(key as KeyOf<FiltersState>);
					}

					return (
						<Chip
							key={key}
							className={`${buttonMr} ${buttonMb}`}
							label={label}
							size='small'
							color='primary'
							{...conditionalProps}
						/>
					);
				}

				return null;
			})}
		</Box>
	);
};

export default SelectedFilters;
