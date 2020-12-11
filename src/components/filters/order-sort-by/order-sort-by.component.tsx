import { useSelector, useDispatch } from 'react-redux';
import { SortOrder } from '@generated/graphql';
const Box = require('@material-ui/core/Box').default;
const InputLabel = require('@material-ui/core/InputLabel').default;
const MenuItem = require('@material-ui/core/MenuItem').default;
const ListSubheader = require('@material-ui/core/ListSubheader').default;
const ListItemText = require('@material-ui/core/ListItemText').default;
const Check = require('@material-ui/icons/Check').default;
const Typography = require('@material-ui/core/Typography').default;

import { setSortBy, setOrderBy, SortBy, OrderBy, selectOrderSort } from '@lib/redux/filters';

import { FormControl, Select } from './order-sort-by.styled';

type ArrayValues = {
	type: 'sort' | 'order';
	value: SortBy | OrderBy;
	label: string;
};

const sortByValues: ArrayValues[] = [
	{
		type: 'sort',
		value: 'dateFrom',
		label: 'Departure date'
	},
	{
		type: 'sort',
		value: 'dateTo',
		label: 'Return date'
	},
	{
		type: 'sort',
		value: 'createdAt',
		label: 'Date added'
	}
];
const orderByValues: ArrayValues[] = [
	{
		type: 'order',
		value: SortOrder.Asc,
		label: 'Asc'
	},
	{
		type: 'order',
		value: SortOrder.Desc,
		label: 'Desc'
	}
];

const OrderSortBy = () => {
	const dispatch = useDispatch();
	const orderSort = useSelector(selectOrderSort);

	const handleChange = (event: React.ChangeEvent<{ value: string[] }>) => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const [type, value] = event.target.value.pop()!.split('-') as ['sort' | 'order', SortBy | OrderBy];

		if (type === 'sort') {
			dispatch(setSortBy(value as SortBy));
		} else {
			dispatch(setOrderBy(value as OrderBy));
		}
	};

	return (
		<FormControl variant='outlined' size='small'>
			<InputLabel id='grouped-select'>Sort {'&'} Order</InputLabel>
			<Select
				label='Sort & Order'
				labelId='grouped-select'
				defaultValue=''
				id='grouped-select-id'
				multiple
				value={Object.entries(orderSort).map(([key, value]) => `${key}-${value}`)}
				onChange={handleChange}
				renderValue={(selected: string[]) => (
					<Box display='flex' flexWrap='wrap'>
						{selected
							.map(selectedValue => {
								const item = [...orderByValues, ...sortByValues].find(
									({ type, value }) => `${type}-${value}` === selectedValue
								);
								return item?.label;
							})
							.join(', ')}
					</Box>
				)}
				MenuProps={{
					anchorOrigin: {
						vertical: 'bottom',
						horizontal: 'left'
					},
					transformOrigin: {
						vertical: 'top',
						horizontal: 'left'
					},
					getContentAnchorEl: null
				}}
			>
				<ListSubheader>Sort by</ListSubheader>
				{sortByValues.map(({ type, value, label }) => (
					<MenuItem key={value} value={`${type}-${value}`}>
						<Box minWidth='40px' display='flex' alignItems='center'>
							{Object.values(orderSort).includes(value) && <Check fontSize='small' color='primary' />}
						</Box>
						<ListItemText primary={<Typography variant='body2'>{label}</Typography>} disableTypography={true} />
					</MenuItem>
				))}
				<ListSubheader>Order by</ListSubheader>
				{orderByValues.map(({ type, value, label }) => (
					<MenuItem key={value} value={`${type}-${value}`}>
						<Box minWidth='40px' display='flex' alignItems='center'>
							{Object.values(orderSort).includes(value) && <Check fontSize='small' color='primary' />}
						</Box>
						<ListItemText primary={<Typography variant='body2'>{label}</Typography>} disableTypography={true} />
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default OrderSortBy;
