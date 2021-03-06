import { useDispatch, useSelector } from 'react-redux';

import { selectFilters } from '@lib/redux/filters';

const RowsView = () => {
	const dispatch = useDispatch();
	const { view, rows } = useSelector(selectFilters);

	return (
		<>TODO, Rows en View selector</>
		// <Box display='flex' alignItems='center'>
		// 	<Box mr={0.5}>
		// 		<ToggleButton
		// 			size='small'
		// 			aria-label='rows per page'
		// 			defaultValue={rows}
		// 			buttons={[
		// 				{
		// 					label: <span className='bold'>10</span>,
		// 					title: '10 rows per page',
		// 					value: '10'
		// 				},
		// 				{
		// 					label: <span className='bold'>25</span>,
		// 					title: '25 rows per page',
		// 					value: '25'
		// 				},
		// 				{
		// 					label: <span className='bold'>50</span>,
		// 					title: '50 rows per page',
		// 					value: '50'
		// 				}
		// 			]}
		// 			onChange={value => dispatch(setRows(value as Rows))}
		// 		/>
		// 	</Box>
		// 	<ToggleButton
		// 		size='small'
		// 		defaultValue={view}
		// 		aria-label='view'
		// 		buttons={[
		// 			{
		// 				label: <ViewListIcon />,
		// 				title: 'List view',
		// 				value: 'list'
		// 			},
		// 			{
		// 				label: <ViewModuleIcon />,
		// 				title: 'Grid view',
		// 				value: 'grid'
		// 			}
		// 		]}
		// 		onChange={value => dispatch(setView(value as View))}
		// 	/>
		// </Box>
	);
};

export default RowsView;
