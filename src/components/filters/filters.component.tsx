import { useDispatch, useSelector } from 'react-redux';
const Box = require('@material-ui/core/Box').default;
const ViewListIcon = require('@material-ui/icons/ViewList').default;
const ViewModuleIcon = require('@material-ui/icons/ViewModule').default;

import { ToggleButton } from '@components/toggle-button';
import { OrderSortBy } from '@components/filters';
import { View, setView, setRows, Rows, selectFilters } from '@lib/redux/filters';

const Filters = () => {
	const dispatch = useDispatch();
	const { view, rows } = useSelector(selectFilters);

	return (
		<Box display='flex' alignItems='center'>
			<Box mr={1}>
				<OrderSortBy />
			</Box>
			<Box mr={1}>
				<ToggleButton
					size='small'
					defaultValue={rows}
					buttons={[
						{
							label: <span className='highlight bold'>10</span>,
							title: '10 rows per page',
							value: '10'
						},
						{
							label: <span className='highlight bold'>25</span>,
							title: '25 rows per page',
							value: '25'
						},
						{
							label: <span className='highlight bold'>50</span>,
							title: '50 rows per page',
							value: '50'
						}
					]}
					onChange={value => dispatch(setRows(value as Rows))}
				/>
			</Box>
			<ToggleButton
				size='small'
				defaultValue={view}
				buttons={[
					{
						label: <ViewListIcon color='primary' />,
						title: 'List view',
						value: 'list'
					},
					{
						label: <ViewModuleIcon color='primary' />,
						title: 'Grid view',
						value: 'grid'
					}
				]}
				onChange={value => dispatch(setView(value as View))}
			/>
		</Box>
	);
};

export default Filters;
