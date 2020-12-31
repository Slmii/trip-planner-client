import React, { useCallback } from 'react';
import dayjs from 'dayjs';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
const Container = require('@material-ui/core/Container').default;
const Box = require('@material-ui/core/Box').default;
const Divider = require('@material-ui/core/Divider').default;
const Typography = require('@material-ui/core/Typography').default;
const Chip = require('@material-ui/core/Chip').default;
const FormControl = require('@material-ui/core/FormControl').default;
const FormControlLabel = require('@material-ui/core/FormControlLabel').default;
const FormGroup = require('@material-ui/core/FormGroup').default;
const FormHelperText = require('@material-ui/core/FormHelperText').default;
const Checkbox = require('@material-ui/core/Checkbox').default;
const InputAdornment = require('@material-ui/core/InputAdornment').default;
const IconButton = require('@material-ui/core/IconButton').default;
const SearchIcon = require('@material-ui/icons/Search').default;
const TuneIcon = require('@material-ui/icons/Tune').default;
const ExpandMoreIcon = require('@material-ui/icons/ExpandMore').default;
const ExpandLessIcon = require('@material-ui/icons/ExpandLess').default;
const ClearIcon = require('@material-ui/icons/Clear').default;

import {
	ORDER_BY_VALUES,
	SORT_BY_VALUES,
	SEARCH_IN,
	POPOVER_FILTER_DATES,
	IAnchorElementState,
	IFiltersState,
	IFilterChange
} from '@components/filters';
import { InputField } from '@components/inputs';
import { Button } from '@components/button';
import { Menu } from '@components/menu';
import { Popover } from '@components/popover';
import { DatePicker } from '@components/datepicker';
import { helpers } from '@lib/utils';
import { KeyOf } from '@lib/types';
import { useActivityTypesQuery, useTransportationTypesQuery } from '@generated/graphql';

import theme from '@theme/index';
import { globalStyles } from '@styles/global-styled';
import { ParsableDate } from '@material-ui/pickers/constants/prop-types';
import { DateTimePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

const ExtendedFilters = () => {
	const router = useRouter();

	const queryStringsAsFilters = useMemo(() => helpers.getQueryStringFilters(router.query), [router.query]);
	const { search, searchIn, dateFrom, dateTo, activityDate, activityType, transportationType, sort, order } = queryStringsAsFilters;

	const [showFiltersSection, setShowFiltersSection] = useState(false);
	const [anchorEls, setAnchorEls] = useState<IAnchorElementState>({
		quickFilters: null,
		dateFrom: null,
		dateTo: null,
		activityDate: null,
		activityType: null,
		transportationType: null,
		filters: null,
		sort: null
	});

	const [searchInput, setSearchInput] = useState(search ?? '');

	const { data: activityTypesData } = useActivityTypesQuery();
	const { data: transportationTypesData } = useTransportationTypesQuery();

	const { buttonMr, buttonMl, buttonMt, buttonMb, activeButton, errorChipContained, divider, bold } = globalStyles();

	useEffect(() => {
		const canShowFiltersSection = helpers.hasQueryStrings<IFiltersState>(queryStringsAsFilters, [
			'search',
			'dateFrom',
			'dateTo',
			'activityDate',
			'activityType',
			'transportationType'
		]);

		canShowFiltersSection && setShowFiltersSection(true);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleOnMenuOpen = useCallback((e: React.MouseEvent, type: KeyOf<IAnchorElementState>) => {
		setAnchorEls(prevState => ({ ...prevState, [type]: e.currentTarget }));
	}, []);

	const handleOnChipDelete = useCallback((type: KeyOf<IFiltersState>) => {
		if (type === 'search') {
			setSearchInput('');
		}

		const queryStrings = helpers.convertFiltersToRouterQueryObject({
			filters: queryStringsAsFilters,
			removeQueryStrings: [type]
		});

		router.push({
			pathname: `/trips/${router.query.trips}`,
			query: {
				page: 1,
				...queryStrings
			}
		});
	}, []);

	const handleOnSubmitSearchInput = useCallback((e: React.FormEvent) => {
		e.preventDefault();
		handleOnFilterChange({
			queryString: 'search',
			value: searchInput,
			closeMenu: false
		});
	}, []);

	const handleOnMenuClose = (type: KeyOf<IAnchorElementState>) => {
		setAnchorEls(prevState => ({ ...prevState, [type]: null }));
	};

	const handleOnClearFilters = useCallback(() => {
		setSearchInput('');
		router.push(`/trips/${router.query.trips}`);
	}, []);

	const handleOnFilterChange = useCallback(({ queryString, value, closeMenu = true, otherMenus }: IFilterChange) => {
		if (closeMenu) {
			handleOnMenuClose(queryString as KeyOf<IAnchorElementState>);

			if (otherMenus) {
				otherMenus.forEach(menu => handleOnMenuClose(menu));
			}
		}

		// Append to URL object if a filter is chosen or if a query string (filter) is already present in the URL
		// This way we dont lose the state of all chosen filters
		const queryStrings = helpers.convertFiltersToRouterQueryObject({ filters: queryStringsAsFilters, queryString, value });

		router.push({
			pathname: `/trips/${router.query.trips}`,
			query: {
				page: 1,
				...queryStrings
			}
		});
	}, []);

	const handleOnSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value);
	};

	const handleOnToggleFiltersSection = () => {
		setShowFiltersSection(prevState => !prevState);
	};

	const handleOnDatePickerChange = useCallback(
		(queryString: KeyOf<IFiltersState>) => (date: MaterialUiPickersDate) => {
			handleOnFilterChange({
				value: date,
				queryString
			});
		},
		[]
	);

	const handleOnPopoverClose = useCallback((type: string) => {
		handleOnMenuClose(type as KeyOf<IAnchorElementState>);
	}, []);

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
									placeholder='Search in trips, activities or preparations'
									type='text'
									name='search'
									size='small'
									value={searchInput}
									onChange={handleOnSearchInputChange}
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
								onClick={handleOnToggleFiltersSection}
							>
								Filters
							</Button>
						</Box>
						{showFiltersSection && (
							<>
								<Divider className={divider} />
								<Box display='flex' justifyContent='space-between'>
									{/*<Chip
										aria-controls='date-from-menu'
										aria-haspopup='true'
										className={cn(buttonMr, buttonMb)}
										clickable={true}
										deleteIcon={!dateFrom ? anchorEls.dateFrom ? <ExpandLessIcon /> : <ExpandMoreIcon /> : undefined}
										onClick={(e: React.MouseEvent) => handleOnMenuOpen(e, 'dateFrom')}
										onDelete={() => handleOnChipDelete('dateFrom')}
										label={`Date from${dateFrom ? `: ${helpers.formatDate({ date: dateFrom })}` : ''}`}
										color='primary'
										variant={dateFrom ? 'default' : 'outlined'}
										size='small'
									/>
									<Chip
										aria-controls='date-to-popover'
										aria-haspopup='true'
										className={cn(buttonMr, buttonMb)}
										clickable={true}
										deleteIcon={!dateTo ? anchorEls.dateTo ? <ExpandLessIcon /> : <ExpandMoreIcon /> : undefined}
										onClick={(e: React.MouseEvent) => handleOnMenuOpen(e, 'dateTo')}
										onDelete={() => handleOnChipDelete('dateTo')}
										label={`Date to${dateTo ? `: ${helpers.formatDate({ date: dateTo })}` : ''}`}
										color='primary'
										variant={dateTo ? 'default' : 'outlined'}
										size='small'
									/>
									<Chip
										aria-controls='activity-date-popover'
										aria-haspopup='true'
										className={cn(buttonMr, buttonMb)}
										clickable={true}
										deleteIcon={
											!activityDate ? anchorEls.activityDate ? <ExpandLessIcon /> : <ExpandMoreIcon /> : undefined
										}
										onClick={(e: React.MouseEvent) => handleOnMenuOpen(e, 'activityDate')}
										onDelete={() => handleOnChipDelete('activityDate')}
										label={`Activity date${activityDate ? `: ${helpers.formatDate({ date: activityDate })}` : ''}`}
										color='primary'
										variant={activityDate ? 'default' : 'outlined'}
										size='small'
									/>
									{POPOVER_FILTER_DATES.map(value => {
										return (
											<Popover
												key={value}
												type={value}
												anchorEl={anchorEls[value as KeyOf<IAnchorElementState>]}
												onClose={handleOnPopoverClose}
											>
												<DatePicker
													date={queryStringsAsFilters[value]}
													onChange={handleOnDatePickerChange(value)}
												/>
											</Popover>
										);
									})}

									 <Box display='flex' mb={1} flexWrap='wrap' width='100%'>
										<Chip
											aria-controls='quick-filters-popover'
											aria-haspopup='true'
											className={cn(buttonMr, buttonMb)}
											clickable={true}
											deleteIcon={anchorEls.quickFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
											onClick={(e: React.MouseEvent) => handleOnMenuOpen(e, 'quickFilters')}
											// eslint-disable-next-line @typescript-eslint/no-empty-function
											onDelete={() => {}}
											label='Quick options'
											color='primary'
											size='small'
										/>
										{search ? (
											<Chip
												className={cn(buttonMr, buttonMb)}
												clickable={true}
												onDelete={() => handleOnChipDelete('search')}
												label={`Search${search ? `: ${search}` : ''}`}
												color='primary'
												size='small'
											/>
										) : null}
										<Chip
											aria-controls='sort-menu'
											aria-haspopup='true'
											className={cn(buttonMr, buttonMb)}
											clickable={true}
											deleteIcon={anchorEls.sort ? <ExpandLessIcon /> : <ExpandMoreIcon />}
											onClick={(e: React.MouseEvent) => handleOnMenuOpen(e, 'sort')}
											label={`Sort: ${SORT_BY_VALUES.find(
												item => item.value === sort
											)?.label.toLowerCase()}, ${ORDER_BY_VALUES.find(
												item => item.value === order
											)?.label.toLowerCase()}`}
											// eslint-disable-next-line @typescript-eslint/no-empty-function
											onDelete={() => {}}
											color='primary'
											size='small'
										/>
										<Chip
											aria-controls='date-from-menu'
											aria-haspopup='true'
											className={cn(buttonMr, buttonMb)}
											clickable={true}
											deleteIcon={
												!dateFrom ? anchorEls.dateFrom ? <ExpandLessIcon /> : <ExpandMoreIcon /> : undefined
											}
											onClick={(e: React.MouseEvent) => handleOnMenuOpen(e, 'dateFrom')}
											onDelete={() => handleOnChipDelete('dateFrom')}
											label={`Date from${dateFrom ? `: ${helpers.formatDate({ date: dateFrom })}` : ''}`}
											color='primary'
											variant={dateFrom ? 'default' : 'outlined'}
											size='small'
										/>
										<Chip
											aria-controls='date-to-popover'
											aria-haspopup='true'
											className={cn(buttonMr, buttonMb)}
											clickable={true}
											deleteIcon={!dateTo ? anchorEls.dateTo ? <ExpandLessIcon /> : <ExpandMoreIcon /> : undefined}
											onClick={(e: React.MouseEvent) => handleOnMenuOpen(e, 'dateTo')}
											onDelete={() => handleOnChipDelete('dateTo')}
											label={`Date to${dateTo ? `: ${helpers.formatDate({ date: dateTo })}` : ''}`}
											color='primary'
											variant={dateTo ? 'default' : 'outlined'}
											size='small'
										/>
										<Chip
											aria-controls='activity-date-popover'
											aria-haspopup='true'
											className={cn(buttonMr, buttonMb)}
											clickable={true}
											deleteIcon={
												!activityDate ? anchorEls.activityDate ? <ExpandLessIcon /> : <ExpandMoreIcon /> : undefined
											}
											onClick={(e: React.MouseEvent) => handleOnMenuOpen(e, 'activityDate')}
											onDelete={() => handleOnChipDelete('activityDate')}
											label={`Activity date${activityDate ? `: ${helpers.formatDate({ date: activityDate })}` : ''}`}
											color='primary'
											variant={activityDate ? 'default' : 'outlined'}
											size='small'
										/>
										<Chip
											aria-controls='activity-menu'
											aria-haspopup='true'
											className={cn(buttonMr, buttonMb)}
											clickable={true}
											deleteIcon={
												!activityType ? anchorEls.activityType ? <ExpandLessIcon /> : <ExpandMoreIcon /> : undefined
											}
											onClick={(e: React.MouseEvent) => handleOnMenuOpen(e, 'activityType')}
											onDelete={() => handleOnChipDelete('activityType')}
											label={`Activity${
												activityType
													? `: ${
															activityTypesData?.activityTypes
																?.find(({ type }) => type === activityType)
																?.name.toLowerCase()
															// eslint-disable-next-line no-mixed-spaces-and-tabs
													  }`
													: ''
											}`}
											color='primary'
											variant={activityType ? 'default' : 'outlined'}
											size='small'
										/>
										<Chip
											aria-controls='transportation-menu'
											aria-haspopup='true'
											className={cn(buttonMr, buttonMb)}
											clickable={true}
											deleteIcon={
												!transportationType ? (
													anchorEls.transportationType ? (
														<ExpandLessIcon />
													) : (
														<ExpandMoreIcon />
													)
												) : undefined
											}
											onClick={(e: React.MouseEvent) => handleOnMenuOpen(e, 'transportationType')}
											onDelete={() => handleOnChipDelete('transportationType')}
											label={`Transportation${
												transportationType
													? `: ${
															transportationTypesData?.transportationTypes
																?.find(({ type }) => type === transportationType)
																?.name.toLowerCase()
															// eslint-disable-next-line no-mixed-spaces-and-tabs
													  }`
													: ''
											}`}
											color='primary'
											variant={transportationType ? 'default' : 'outlined'}
											size='small'
										/>

										<Popover
											type='quickFilters'
											anchorEl={anchorEls.quickFilters}
											onClose={type => handleOnMenuClose(type as KeyOf<IAnchorElementState>)}
										>
											<Box display='flex' width='450px'>
												<Box width='50%' display='flex' flexDirection='column' margin='20px 15px 20px 20px'>
													<FormControl component='fieldset'>
														<Typography variant='body2' gutterBottom className={bold}>
															Search in:
														</Typography>
														<Divider />
														<FormGroup>
															{SEARCH_IN.map(({ label, value }) => {
																const isDisabled = searchIn.length === 1 && searchIn[0] === value;
																const isChecked = searchIn.includes(value);

																return (
																	<FormControlLabel
																		key={value}
																		control={
																			<Checkbox
																				checked={isChecked}
																				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
																					handleOnFilterChange({
																						queryString: 'searchIn',
																						value: `${e.target.name}-${e.target.checked}`,
																						closeMenu: false
																					})
																				}
																				disabled={isDisabled}
																				name={value}
																				color='primary'
																				size='small'
																			/>
																		}
																		label={<Typography variant='body2'>{label}</Typography>}
																	/>
																);
															})}
														</FormGroup>
														<FormHelperText margin='dense'>At least 1 checkbox must be selected</FormHelperText>
													</FormControl>
												</Box>
												<Box width='50%' display='flex' flexDirection='column' margin='20px 30px 20px 15px'>
													<Typography variant='body2' gutterBottom className={bold}>
														Date:
													</Typography>
													<Divider />
													<Button
														variant='outlined'
														className={cn(buttonMb, buttonMt)}
														onClick={() =>
															handleOnFilterChange({
																queryString: 'dateTo',
																value: helpers.getEndOfWeek(),
																otherMenus: ['quickFilters']
															})
														}
													>
														This week
													</Button>
													<Button
														variant='outlined'
														className={buttonMb}
														onClick={() =>
															handleOnFilterChange({
																queryString: 'dateTo',
																value: helpers.getEndOfMonth(),
																otherMenus: ['quickFilters']
															})
														}
													>
														This month
													</Button>
													<Button
														variant='outlined'
														className={buttonMb}
														onClick={() => {
															const upcomingMonth = helpers.addUnitToCurrentDate(1, 'month');

															handleOnFilterChange({
																queryString: 'dateTo',
																value: helpers.getEndOfMonth(upcomingMonth),
																otherMenus: ['quickFilters']
															});
														}}
													>
														Upcoming month
													</Button>
													<Button
														variant='outlined'
														className={buttonMb}
														onClick={() => {
															const upcomingMonths = helpers.addUnitToCurrentDate(3, 'month');

															handleOnFilterChange({
																queryString: 'dateTo',
																value: helpers.getEndOfMonth(upcomingMonths),
																otherMenus: ['quickFilters']
															});
														}}
													>
														Upcoming 3 months
													</Button>
												</Box>
											</Box>
										</Popover>
										{POPOVER_FILTER_DATES.map(value => {
											return (
												<Popover
													key={value}
													type={value}
													anchorEl={anchorEls[value as KeyOf<IAnchorElementState>]}
													onClose={type => handleOnMenuClose(type as KeyOf<IAnchorElementState>)}
												>
													<FiltersDatePicker
														date={queryStringsAsFilters[value]}
														onChange={date => handleOnFilterChange({ queryString: value, value: date })}
													/>
												</Popover>
											);
										})}
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
													selected: activityType === type
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
													selected: transportationType === type
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
														selected: sort === value
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
														selected: order === value
													}))
												}
											]}
										/>
									</Box>
									<Chip
										className={errorChipContained}
										clickable={true}
										onClick={handleOnClearFilters}
										deleteIcon={<ClearIcon className='white' />}
										onDelete={handleOnClearFilters}
										label='Clear filters'
										size='small'
									/>*/}
								</Box>
							</>
						)}
					</Box>
				</Box>
			</Container>
		</Box>
	);
};

ExtendedFilters.whyDidYouRender = true;

export default React.memo(ExtendedFilters);
