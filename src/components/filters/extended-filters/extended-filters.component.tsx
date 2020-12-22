import cn from 'classnames';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// import { KeyboardDatePicker } from '@material-ui/pickers';
const Container = require('@material-ui/core/Container').default;
const Box = require('@material-ui/core/Box').default;
const SearchIcon = require('@material-ui/icons/Search').default;
const TuneIcon = require('@material-ui/icons/Tune').default;
const ArrowDropDownIcon = require('@material-ui/icons/ArrowDropDown').default;
const ArrowDropUpIcon = require('@material-ui/icons/ArrowDropUp').default;
const ClearIcon = require('@material-ui/icons/Clear').default;

import { ORDER_BY_VALUES, SORT_BY_VALUES, AnchorElementState, FiltersState, SelectedFilters, FilterChange } from '@components/filters';
import { InputField } from '@components/inputs';
import { Button } from '@components/button';
import { Menu } from '@components/menu';
import { helpers } from '@lib/utils';
import { KeyOf } from '@lib/types';
import { useActivityTypesQuery, useTransportationTypesQuery } from '@generated/graphql';

import theme from '@theme/index';
import { globalStyles } from '@styles/global-styled';

const ExtendedFilters = () => {
	const router = useRouter();

	const queryStringFilters = helpers.getQueryStringFilters(router.query);
	const {
		search: qsSearch,
		departureDate: qsDepartureDate,
		returnDate: qsReturnDate,
		activityDate: qsActivityDate,
		activityType: qsActivityType,
		transportationType: qsTransportationType,
		sort: qsSort,
		order: qsOrder
	} = queryStringFilters;

	const [showFiltersSection, setShowFiltersSection] = useState(false);
	const [anchorEls, setAnchorEls] = useState<AnchorElementState>({
		departureDate: null,
		returnDate: null,
		activityDate: null,
		activityType: null,
		transportationType: null,
		filters: null,
		sort: null
	});

	const [searchInput, setSearchInput] = useState(qsSearch ?? '');

	const { data: activityTypesData } = useActivityTypesQuery();
	const { data: transportationTypesData } = useTransportationTypesQuery();

	const { buttonMr, buttonMl, activeButton, errorButtonOutlined } = globalStyles();

	useEffect(() => {
		const canShowFiltersSection = helpers.hasQueryStrings<FiltersState>(queryStringFilters, [
			'search',
			'departureDate',
			'returnDate',
			'activityDate',
			'activityType',
			'transportationType'
		]);

		canShowFiltersSection && setShowFiltersSection(true);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleOnChipDelete = (type: KeyOf<FiltersState>) => {
		if (type === 'search') {
			setSearchInput('');
		}

		const queryStrings = helpers.convertToFiltersRouterQueryObject({ filters: queryStringFilters, removeQueryStrings: [type] });

		router.push({
			pathname: `/trips/${router.query.trips}`,
			query: {
				page: 1,
				...queryStrings
			}
		});
	};

	const handleOnSubmitSearchInput = (e: React.FormEvent) => {
		e.preventDefault();
		handleOnFilterChange({
			queryString: 'search',
			value: searchInput,
			closeMenu: false
		});
	};

	const handleOnMenuOpen = (e: React.MouseEvent, type: KeyOf<AnchorElementState>) => {
		setAnchorEls(prevState => ({ ...prevState, [type]: e.currentTarget }));
	};

	const handleOnMenuClose = (type: KeyOf<AnchorElementState>) => {
		setAnchorEls(prevState => ({ ...prevState, [type]: null }));
	};

	const handleOnClearFilters = () => {
		setSearchInput('');
		router.push(`/trips/${router.query.trips}`, undefined, {
			shallow: true
		});
	};

	const handleOnFilterChange = ({ queryString, value, closeMenu = true }: FilterChange) => {
		if (closeMenu) {
			handleOnMenuClose(queryString as KeyOf<AnchorElementState>);
		}

		// Append to URL object if a filter is chosen or if a query string (filter) is already present in the URL
		// This way we dont lose the state of all chosen filters
		const queryStrings = helpers.convertToFiltersRouterQueryObject({ filters: queryStringFilters, queryString, value });

		router.push({
			pathname: `/trips/${router.query.trips}`,
			query: {
				page: 1,
				...queryStrings
			}
		});
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
							<Box component='form' onSubmit={handleOnSubmitSearchInput} width='100%' display='flex'>
								<InputField
									label='Search'
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
									[activeButton]: showFiltersSection
								})}
								fullWidth={false}
								endIcon={<TuneIcon />}
								onClick={() => setShowFiltersSection(prevState => !prevState)}
							>
								Filters
							</Button>
						</Box>
						{showFiltersSection && (
							<>
								<Box display='flex' mt={1} mb={1}>
									<Button
										aria-controls='activity-menu'
										aria-haspopup='true'
										variant='outlined'
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
													handleOnFilterChange({
														queryString: 'activityType',
														value: value
													}),
												selected: qsActivityType === type
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
													handleOnFilterChange({
														queryString: 'transportationType',
														value: value
													}),
												selected: qsTransportationType === type
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
														handleOnFilterChange({
															queryString: 'sort',
															value: value,
															closeMenu: false
														}),
													selected: qsSort === value
												}))
											},
											{
												subHeader: 'Order by',
												type: 'order',
												menuItems: ORDER_BY_VALUES.map(({ label, value }) => ({
													label,
													value,
													onMenuItemClick: value =>
														handleOnFilterChange({
															queryString: 'order',
															value: value,
															closeMenu: false
														}),
													selected: qsOrder === value
												}))
											}
										]}
									/>
								</Box>
								<SelectedFilters
									filters={queryStringFilters}
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
