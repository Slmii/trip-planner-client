import cn from 'classnames';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
const Container = require('@material-ui/core/Container').default;
const Box = require('@material-ui/core/Box').default;
const SearchIcon = require('@material-ui/icons/Search').default;
const TuneIcon = require('@material-ui/icons/Tune').default;
const ArrowDropDownIcon = require('@material-ui/icons/ArrowDropDown').default;
const ArrowDropUpIcon = require('@material-ui/icons/ArrowDropUp').default;
const ClearIcon = require('@material-ui/icons/Clear').default;

import {
	ORDER_BY_VALUES,
	SORT_BY_VALUES,
	INITIAL_FILTERS_STATE,
	AnchorElementState,
	FiltersState,
	SelectedFilters,
	MenuItemClick
} from '@components/filters';
import { InputField } from '@components/inputs';
import { Button } from '@components/button';
import { Menu } from '@components/menu';
import { helpers } from '@lib/utils';
import { useFirstRender } from '@lib/hooks';
import { useActivityTypesQuery, useTransportationTypesQuery } from '@generated/graphql';

import theme from '@theme/index';
import { globalStyles } from '@styles/global-styled';
import { FaLess } from 'react-icons/fa';

const ExtendedFilters = () => {
	const router = useRouter();

	const [filters, setFilters] = useState<FiltersState>(INITIAL_FILTERS_STATE);

	const [showFilters, setShowFilters] = useState(false);
	const [anchorEls, setAnchorEls] = useState<AnchorElementState>({
		activityType: null,
		transportationType: null,
		filters: null,
		sort: null
	});

	const [searchInput, setSearchInput] = useState<string | null>(null);

	const { data: activityTypesData } = useActivityTypesQuery();
	const { data: transportationTypesData } = useTransportationTypesQuery();

	const firstRender = useFirstRender();

	const { buttonMr, buttonMl, buttonMb, activeButton, errorButtonOutlined } = globalStyles();

	useEffect(() => {
		const {
			search: qsSearch,
			departureDate: qsDepartureDate,
			returnDate: qsReturnDate,
			activityDate: qsActivityDate,
			activityType: qsActivityType,
			transportationType: qsTransportationType,
			sort: qsSort,
			order: qsOrder
		} = helpers.getQueryStringFilters(router.query);

		// Make new object with type FiltersState. Use this to set state.
		// Use null instead of undefined because the state does not accept undefined.
		const queryStringsFilters: FiltersState = {
			search: qsSearch ?? null,
			departureDate: qsDepartureDate ?? null,
			returnDate: qsReturnDate ?? null,
			activityDate: qsActivityDate ?? null,
			activityType: qsActivityType ?? null,
			transportationType: qsTransportationType ?? null,
			sort: qsSort,
			order: qsOrder
		};

		// Show the filters section if there are any query strings in the URL
		helpers.hasProperties<FiltersState>(queryStringsFilters, [
			'search',
			'departureDate',
			'returnDate',
			'activityDate',
			'activityType',
			'transportationType'
		]) && setShowFilters(true);

		// Set query strings from the URL in the according state
		setSearchInput(queryStringsFilters.search);
		setFilters(queryStringsFilters);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useDeepCompareEffect(() => {
		if (!firstRender) {
			// Set query strings in URL after each filter change
			router.push({
				pathname: `/trips/${router.query.trips}`,
				query: Object.entries(filters)
					.filter(([_, value]) => value)
					.reduce((accum, [key, value]) => {
						accum[key] = value;
						return accum;
					}, {} as Record<string, string>)
			});
		}
	}, [firstRender, filters]);

	const handleOnChipDelete = (type: keyof FiltersState) => {
		if (type === 'search') {
			setSearchInput('');
		}

		setFilters(prevState => ({
			...prevState,
			[type]: null
		}));
	};

	const handleOnMenuOpen = (e: React.MouseEvent, type: keyof AnchorElementState) => {
		setAnchorEls(prevState => ({ ...prevState, [type]: e.currentTarget }));
	};

	const handleOnMenuClose = (type: keyof AnchorElementState) => {
		setAnchorEls(prevState => ({ ...prevState, [type]: null }));
	};

	const handleOnMenuItemClick = ({ type, value, closeMenu = true }: MenuItemClick) => {
		setFilters(prevState => ({
			...prevState,
			[type]: value
		}));

		if (closeMenu) {
			setAnchorEls(prevState => ({ ...prevState, [type]: null }));
		}
	};

	const handleOnSubmitSearch = (e: React.FormEvent) => {
		e.preventDefault();

		setFilters(prevState => ({
			...prevState,
			search: searchInput
		}));
	};

	const handleOnClearFilters = () => {
		setSearchInput('');
		setFilters(INITIAL_FILTERS_STATE);
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
									type='text'
									name='search'
									size='small'
									value={searchInput as string}
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
												onMenuItemClick: value =>
													handleOnMenuItemClick({
														type: 'activityType',
														value
													}),
												selected: filters.activityType === type
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
												onMenuItemClick: value =>
													handleOnMenuItemClick({
														type: 'transportationType',
														value
													}),
												selected: filters.transportationType === type
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
														handleOnMenuItemClick({
															type: 'sort',
															value,
															closeMenu: false
														}),
													selected: filters.sort === value
												}))
											},
											{
												subHeader: 'Order by',
												type: 'order',
												menuItems: ORDER_BY_VALUES.map(({ label, value }) => ({
													label,
													value,
													onMenuItemClick: value =>
														handleOnMenuItemClick({
															type: 'order',
															value,
															closeMenu: false
														}),
													selected: filters.order === value
												}))
											}
										]}
									/>
								</Box>
								<SelectedFilters
									filters={filters}
									activityTypes={activityTypesData?.activityTypes}
									transportationTypes={transportationTypesData?.transportationTypes}
									onDelete={handleOnChipDelete}
								/>
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
