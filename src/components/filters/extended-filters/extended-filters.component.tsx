import cn from 'classnames';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
const Container = require('@material-ui/core/Container').default;
const Box = require('@material-ui/core/Box').default;
const Chip = require('@material-ui/core/Chip').default;
const SearchIcon = require('@material-ui/icons/Search').default;
const TuneIcon = require('@material-ui/icons/Tune').default;
const ArrowDropDownIcon = require('@material-ui/icons/ArrowDropDown').default;
const ArrowDropUpIcon = require('@material-ui/icons/ArrowDropUp').default;
const ClearIcon = require('@material-ui/icons/Clear').default;

import { ORDER_BY_VALUES, SORT_BY_VALUES, CHIPS_PREFIX_MAPPING, AnchorElementState, ChipsPrefixMapping } from '@components/filters';
import { InputField } from '@components/inputs';
import { Button } from '@components/button';
import { Menu } from '@components/menu';
import { helpers } from '@lib/utils';
import { filters } from '@lib/redux';
import { useFirstRender } from '@lib/hooks';
import { useActivityTypesQuery, useTransportationTypesQuery } from '@generated/graphql';

import theme from '@theme/index';
import { globalStyles } from '@styles/global-styled';

const ExtendedFilters = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const selectedExtendedFilters = useSelector(filters.selectExtended);
	const {
		search: selectedSearch,
		departureDate: selectedDepartureDate,
		returnDate: selectedReturnDate,
		activityDate: selectedActivityDate,
		activityType: selectedActivityType,
		transportationType: selectedTransportationType,
		sort: selectedSort,
		order: selectedOrder
	} = selectedExtendedFilters;

	const [showFilters, setShowFilters] = useState(false);
	const [anchorEls, setAnchorEls] = useState<AnchorElementState>({
		activityType: null,
		transportationType: null,
		filters: null,
		sort: null
	});

	const [searchInput, setSearchInput] = useState('');

	const { data: activityTypesData } = useActivityTypesQuery();
	const { data: transportationTypesData } = useTransportationTypesQuery();

	const firstRender = useFirstRender();

	const { buttonMr, buttonMl, buttonMb, activeButton, errorButtonOutlined } = globalStyles();

	useEffect(() => {
		const queryStrings = helpers.getQueryStringFilters(router.query);
		const {
			search: qsSearch,
			departureDate: qsDepartureDate,
			returnDate: qsReturnDate,
			activityDate: qsActivityDate,
			activityType: qsActivityType,
			transportationType: qsTransportationType,
			sort: qsSort,
			order: qsOrder
		} = queryStrings;

		const currentQueryStringFilters: filters.Extended = {
			search: qsSearch ?? '',
			departureDate: qsDepartureDate ?? selectedDepartureDate,
			returnDate: qsReturnDate ?? selectedReturnDate,
			activityDate: qsActivityDate ?? selectedActivityDate,
			activityType: qsActivityType ?? selectedActivityType,
			transportationType: qsTransportationType ?? selectedTransportationType,
			sort: qsSort ?? selectedSort,
			order: qsOrder ?? selectedOrder
		};

		// Show the filters section if there are any query strings in the URL
		helpers.hasProperties<filters.Extended>(queryStrings, [
			'search',
			'departureDate',
			'returnDate',
			'activityDate',
			'activityType',
			'transportationType'
		]) && setShowFilters(true);

		// Set query strings from the URL in the according state
		setSearchInput(qsSearch ?? selectedSearch);
		dispatch(filters.setExtended(currentQueryStringFilters));

		// Reset store after unmouting component because we dont want to bring over the filters to another component
		return () => {
			dispatch(filters.resetExtended());
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useDeepCompareEffect(() => {
		if (!firstRender) {
			// Set query strings in URL after each filter change
			router.push(
				`/trips/${router.query.trips}?page=1${Object.entries(selectedExtendedFilters)
					.filter(([_, value]) => value)
					.map(([key, value]) => `&${key}=${value}`)
					.join('')}`
			);
		}
	}, [firstRender, selectedExtendedFilters]);

	const handleOnChipDelete = (type: keyof filters.Extended) => {
		if (type === 'search') {
			setSearchInput('');
		}

		dispatch(
			filters.setExtended({
				...selectedExtendedFilters,
				[type]: type === 'search' ? '' : null
			})
		);
	};

	const handleOnMenuOpen = (e: React.MouseEvent, type: keyof AnchorElementState) => {
		setAnchorEls(prevState => ({ ...prevState, [type]: e.currentTarget }));
	};

	const handleOnMenuClose = (type: keyof AnchorElementState) => {
		setAnchorEls(prevState => ({ ...prevState, [type]: null }));
	};

	const handleOnMenuItemClick = (type: keyof filters.Extended, value: string) => {
		dispatch(
			filters.setExtended({
				...selectedExtendedFilters,
				[type]: value
			})
		);

		setAnchorEls(prevState => ({ ...prevState, [type]: null }));
	};

	const handleOnSubmitSearch = (e: React.FormEvent) => {
		e.preventDefault();

		dispatch(
			filters.setExtended({
				...selectedExtendedFilters,
				search: searchInput
			})
		);
	};

	const handleOnClearFilters = () => {
		setSearchInput('');

		dispatch(filters.resetExtended());
	};

	return (
		<Box
			width='100%'
			bgcolor={theme.palette.background.default}
			borderBottom={`1px solid ${theme.palette.borderColor}`}
			position='relative'
			zIndex={1}
		>
			<Container component='div' fixed disableGutters={true}>
				<Box p={1.5} display='flex' flexDirection='column'>
					<Box display='flex' flexDirection='column'>
						<Box display='flex'>
							<Box component='form' onSubmit={handleOnSubmitSearch} width='100%' display='flex'>
								<InputField
									label='Search'
									placeholder='...'
									type='text'
									name='search'
									size='small'
									value={searchInput}
									onChange={e => setSearchInput(e.target.value)}
								/>
								<Button
									variant='contained'
									type='submit'
									className={cn(buttonMl, buttonMr)}
									fullWidth={false}
									endIcon={<SearchIcon />}
								>
									Search
								</Button>
							</Box>
							<Button
								variant='outlined'
								color='inherit'
								className={cn({
									[activeButton]: showFilters
								})}
								fullWidth={false}
								endIcon={<TuneIcon />}
								onClick={() => setShowFilters(prevState => !prevState)}
							>
								Filters
							</Button>
						</Box>
						{showFilters && (
							<>
								<Box display='flex' mt={1} mb={1}>
									<Button
										aria-controls='activity-menu'
										aria-haspopup='true'
										variant='outlined'
										size='small'
										color='inherit'
										fullWidth={false}
										className={cn(buttonMr, {
											[activeButton]: anchorEls.activityType
										})}
										onClick={e => handleOnMenuOpen(e, 'activityType')}
										endIcon={anchorEls.activityType ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
									>
										Activity
									</Button>
									<Button
										aria-controls='transportation-menu'
										aria-haspopup='true'
										variant='outlined'
										size='small'
										color='inherit'
										fullWidth={false}
										className={cn(buttonMr, {
											[activeButton]: anchorEls.transportationType
										})}
										onClick={e => handleOnMenuOpen(e, 'transportationType')}
										endIcon={anchorEls.transportationType ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
									>
										Transportation
									</Button>
									<Button
										aria-controls='transportation-menu'
										aria-haspopup='true'
										variant='outlined'
										size='small'
										color='inherit'
										fullWidth={false}
										className={cn(buttonMr, {
											[activeButton]: anchorEls.sort
										})}
										onClick={e => handleOnMenuOpen(e, 'sort')}
										endIcon={anchorEls.sort ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
									>
										Sort
									</Button>
									<Button
										className={errorButtonOutlined}
										variant='outlined'
										size='small'
										fullWidth={false}
										onClick={handleOnClearFilters}
										endIcon={<ClearIcon />}
									>
										Clear filters
									</Button>
									<Menu
										anchorEl={anchorEls.activityType}
										type='activity'
										onClose={() => handleOnMenuClose('activityType')}
										menu={
											activityTypesData?.activityTypes.map(({ name, type }) => ({
												label: name,
												value: type,
												onMenuItemClick: value => handleOnMenuItemClick('activityType', value),
												selected: selectedActivityType === type
											})) || []
										}
									/>
									<Menu
										anchorEl={anchorEls.transportationType}
										type='transportation'
										onClose={() => handleOnMenuClose('transportationType')}
										menu={
											transportationTypesData?.transportationTypes.map(({ name, type }) => ({
												label: name,
												value: type,
												onMenuItemClick: value => handleOnMenuItemClick('transportationType', value),
												selected: selectedTransportationType === type
											})) || []
										}
									/>
									<Menu
										anchorEl={anchorEls.sort}
										type='sort-by'
										multiple={true}
										onClose={() => handleOnMenuClose('sort')}
										menu={[
											{
												subHeader: 'Sort by',
												type: 'sort',
												menuItems: SORT_BY_VALUES.map(({ label, value }) => ({
													label,
													value,
													onMenuItemClick: value =>
														dispatch(
															filters.setExtended({
																...selectedExtendedFilters,
																sort: value as filters.SortBy
															})
														),
													selected: selectedSort === value
												}))
											},
											{
												subHeader: 'Order by',
												type: 'order',
												menuItems: ORDER_BY_VALUES.map(({ label, value }) => ({
													label,
													value,
													onMenuItemClick: value =>
														dispatch(
															filters.setExtended({
																...selectedExtendedFilters,
																order: value as filters.OrderBy
															})
														),
													selected: selectedOrder === value
												}))
											}
										]}
									/>
								</Box>
								<Box display='flex' flexWrap='wrap'>
									{Object.entries(selectedExtendedFilters).map(([key, value]) => {
										if (value) {
											let typeName = value;

											const isSortOrder = key === 'sort' || key === 'order';
											const isType = key === 'activityType' || key === 'transportationType';

											if (isType) {
												typeName =
													activityTypesData?.activityTypes.find(activity => activity.type === value)?.name ??
													transportationTypesData?.transportationTypes.find(
														transportation => transportation.type === value
													)?.name;
											} else if (isSortOrder) {
												typeName = [...SORT_BY_VALUES, ...ORDER_BY_VALUES].find(item => item.value === value)
													?.label;
											}

											const label = `${CHIPS_PREFIX_MAPPING[key as keyof ChipsPrefixMapping]}: ${typeName}`;

											const conditionalProps: { onDelete?: () => void } = {};

											if (!isSortOrder) {
												conditionalProps.onDelete = () => handleOnChipDelete(key as keyof filters.Extended);
											}

											return (
												<Chip
													key={key}
													className={`${buttonMr} ${buttonMb}`}
													label={label}
													variant='outlined'
													color='secondary'
													size='small'
													{...conditionalProps}
												/>
											);
										}

										return null;
									})}
								</Box>
							</>
						)}
					</Box>
					{/* <S.Filters>
						<Box>
							<KeyboardDatePicker
								fullWidth={true}
								autoOk={true}
								variant='inline'
								inputVariant='outlined'
								mask='__/__/____'
								format='MM/DD/YYYY'
								placeholder='mm/dd/yyyy'
								label='Departure date'
								value={departureDate}
								size='small'
								InputAdornmentProps={{ position: 'end' }}
								onChange={date => setFilters(prevState => ({ ...prevState, departureDate: date }))}
								invalidDateMessage='Please select a departure date'
							/>
						</Box>
						<Box>
							<KeyboardDatePicker
								fullWidth={true}
								autoOk={true}
								variant='inline'
								inputVariant='outlined'
								mask='__/__/____'
								format='MM/DD/YYYY'
								placeholder='mm/dd/yyyy'
								label='Return date'
								value={returnDate}
								size='small'
								InputAdornmentProps={{ position: 'end' }}
								onChange={date => setFilters(prevState => ({ ...prevState, returnDate: date }))}
								invalidDateMessage='Please select a return date'
							/>
						</Box>
						<Box>
							<KeyboardDatePicker
								fullWidth={true}
								autoOk={true}
								variant='inline'
								inputVariant='outlined'
								mask='__/__/____'
								format='MM/DD/YYYY'
								placeholder='mm/dd/yyyy'
								label='Activity date'
								value={returnDate}
								size='small'
								InputAdornmentProps={{ position: 'end' }}
								onChange={date => setFilters(prevState => ({ ...prevState, activityDate: date }))}
								invalidDateMessage='Please select an activity date'
							/>
						</Box> */}
				</Box>
			</Container>
		</Box>
	);
};

export default ExtendedFilters;
