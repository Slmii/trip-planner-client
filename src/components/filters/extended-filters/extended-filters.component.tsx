import React from 'react';
import cn from 'classnames';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import SearchIcon from '@material-ui/icons/Search';
import TuneIcon from '@material-ui/icons/Tune';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ClearIcon from '@material-ui/icons/Clear';
import CancelIcon from '@material-ui/icons/Cancel';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import InputField from '@components/inputs/input-field';
import Button from '@components/buttons/button';
import Menu from '@components/menu';
import Popover from '@components/popover';
import DatePicker from '@components/datepicker';
import { constants, AnchorElementState, QueryStringFilters, QueryStringFilterChange } from '@components/filters/extended-filters';
import { helpers } from '@lib/utils';
import { KeyOf } from '@lib/types';
import { useActivityTypesQuery, useTransportationTypesQuery } from '@generated/graphql';

import theme from '@theme/index';
import { globalStyles } from '@styles/global-styled';

const ExtendedFilters = () => {
	const router = useRouter();

	const [path, subPath] = useMemo(() => helpers.getCurrentRoute(router), [router]);
	const queryStringsAsFilters = useMemo(() => helpers.getQueryStringFilters(router.query), [router.query]);
	const { search, searchIn, dateFrom, dateTo, activityDate, activityType, transportationType, sort, order } = queryStringsAsFilters;

	const [showFiltersSection, setShowFiltersSection] = useState(false);
	const [anchorEls, setAnchorEls] = useState<AnchorElementState>({
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
		const canShowFiltersSection = helpers.hasQueryStrings<QueryStringFilters>(queryStringsAsFilters, [
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

	const handleOnMenuOpen = (e: React.MouseEvent, type: KeyOf<AnchorElementState>) => {
		setAnchorEls(prevState => ({ ...prevState, [type]: e.currentTarget }));
	};

	const handleOnChipDelete = (type: KeyOf<QueryStringFilters>) => {
		if (type === 'search') {
			setSearchInput('');
		}

		const queryStrings = helpers.convertFiltersToRouterQueryObject({
			filters: queryStringsAsFilters,
			removeQueryStrings: [type]
		});

		router.push({
			pathname: `/${path}/${subPath}`,
			query: {
				page: 1,
				...queryStrings
			}
		});
	};

	const handleOnSubmitSearch = (e: React.FormEvent) => {
		e.preventDefault();
		handleOnFilterChange({
			queryString: 'search',
			value: searchInput,
			closeMenu: false
		});
	};

	const handleOnMenuClose = (type: KeyOf<AnchorElementState>) => {
		setAnchorEls(prevState => ({ ...prevState, [type]: null }));
	};

	const handleOnClearFilters = () => {
		setSearchInput('');
		router.push(`/${path}/${subPath}`);
	};

	const handleOnFilterChange = ({ queryString, value, closeMenu = true, otherMenus }: QueryStringFilterChange) => {
		if (closeMenu) {
			handleOnMenuClose(queryString as KeyOf<AnchorElementState>);

			if (otherMenus) {
				otherMenus.forEach(menu => handleOnMenuClose(menu));
			}
		}

		// Append to URL object if a filter is chosen or if a query string (filter) is already present in the URL
		// This way we dont lose the state of all chosen filters
		const queryStrings = helpers.convertFiltersToRouterQueryObject({ filters: queryStringsAsFilters, queryString, value });

		router.push({
			pathname: `/${path}/${subPath}`,
			query: {
				page: 1,
				...queryStrings
			}
		});
	};

	const handleOnSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value);
	};

	const handleOnToggleFiltersSection = () => {
		setShowFiltersSection(prevState => !prevState);
	};

	const handleOnResetSearchInput = () => {
		setSearchInput('');
		handleOnFilterChange({
			queryString: 'search',
			value: '',
			closeMenu: false
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
							<Box component='form' onSubmit={handleOnSubmitSearch} width='100%' display='flex'>
								<InputField
									label='Search'
									placeholder='Search in trips, activities or preparations'
									type='text'
									name='search'
									size='small'
									value={searchInput}
									onChange={handleOnSearchInputChange}
									endAdornment={<CancelIcon color='action' />}
									onIconClick={handleOnResetSearchInput}
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
											label={`Sort: ${constants.SORT_BY_VALUES.find(
												item => item.value === sort
											)?.label.toLowerCase()}, ${constants.ORDER_BY_VALUES.find(
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
											deleteIcon={anchorEls.dateFrom ? <ExpandLessIcon /> : <ExpandMoreIcon />}
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
											deleteIcon={anchorEls.dateTo ? <ExpandLessIcon /> : <ExpandMoreIcon />}
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
											deleteIcon={anchorEls.activityDate ? <ExpandLessIcon /> : <ExpandMoreIcon />}
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
											deleteIcon={anchorEls.activityType ? <ExpandLessIcon /> : <ExpandMoreIcon />}
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
											deleteIcon={anchorEls.transportationType ? <ExpandLessIcon /> : <ExpandMoreIcon />}
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
											onClose={type => handleOnMenuClose(type as KeyOf<AnchorElementState>)}
										>
											<Box display='flex' width='450px'>
												<Box width='50%' display='flex' flexDirection='column' margin='20px 15px 20px 20px'>
													<FormControl component='fieldset'>
														<Typography variant='body2' gutterBottom className={bold}>
															Search in:
														</Typography>
														<Divider />
														<FormGroup>
															{constants.SEARCH_IN.map(({ label, value }) => {
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
										{constants.POPOVER_FILTER_DATES.map(value => {
											return (
												<Popover
													key={value}
													type={value}
													anchorEl={anchorEls[value as KeyOf<AnchorElementState>]}
													onClose={type => handleOnMenuClose(type as KeyOf<AnchorElementState>)}
												>
													<DatePicker
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
													menuItems: constants.SORT_BY_VALUES.map(({ label, value }) => ({
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
													menuItems: constants.ORDER_BY_VALUES.map(({ label, value }) => ({
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
									/>
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
