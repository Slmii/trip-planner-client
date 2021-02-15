import {
    Box,
    Checkbox,
    CheckboxGroup,
    Container,
    Divider,
    Flex,
    Input,
    Tag,
    TagCloseButton,
    TagLabel,
    Text,
    VStack,
    Wrap,
    WrapItem
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
// TODO: change to react-calendar
import DatePicker from 'react-datepicker';
import { MdCancel, MdSearch } from 'react-icons/md';

import Button from '@components/buttons/button';
import {
    constants,
    FilterMenusState,
    QueryStringFilterChange,
    QueryStringFilters
} from '@components/filters/extended-filters';
import FilterTag from '@components/filters/filter-tag';
import InputSwitch from '@components/inputs/input-switch';
import Menu from '@components/overlay/menu';
import Popover from '@components/overlay/popover';
import Paper from '@components/paper';
import {
    activityTypeIconMapping,
    transportationTypeIconMapping
} from '@components/trips/trip-summary/activity';
import { useActivityTypesQuery, useTransportationTypesQuery } from '@generated/graphql';
import { REMOVE_QUERY_STRINGS_ON_ACCOUNT_PAGE } from '@lib/constants';
import { KeyOf } from '@lib/types';
import { date, url } from '@lib/utils';

import spacing from '@theme/spacing';

// const entries = Object.entries as <T>(o: T) => [Extract<keyof T, string>, T[keyof T]][];

const AccountPageContainer = ({ children }: { children: React.ReactNode }) => {
	return (
		<Paper
			display='flex'
			width='100%'
			bg={'gray.50'}
			borderWidth={1}
			borderRadius='base'
			borderStyle='solid'
			borderColor='border'
			position='relative'
		>
			{children}
		</Paper>
	);
};

const ExplorePageContainer = ({ children }: { children: React.ReactNode }) => {
	return (
		<Flex
			width='100%'
			bg={'gray.50'}
			borderBottomWidth={1}
			borderRadius={0}
			borderStyle='solid'
			borderColor='border'
			position='relative'
		>
			{children}
		</Flex>
	);
};

const ExtendedFilters = () => {
	const router = useRouter();

	const [path, subPath] = useMemo(() => url.getCurrentRoute(router), [router]);
	const queryStringsAsFilters = useMemo(() => url.getQueryStringFilters(router.query), [router.query]);
	const {
		search,
		searchIn,
		dateFrom,
		dateTo,
		activityDate,
		activityType,
		transportationType,
		past,
		sort,
		order
	} = queryStringsAsFilters;
	const [searchInput, setSearchInput] = useState(search ?? '');
	const [calendarStates, setCalendarStates] = useState<Partial<Record<KeyOf<QueryStringFilters>, boolean>>>({
		dateFrom: false,
		dateTo: false,
		activityDate: false
	});

	const { data: activityTypesData } = useActivityTypesQuery();
	const { data: transportationTypesData } = useTransportationTypesQuery();

	const isExplorePage = url.isPage('explore', router);
	const isAccountPage = url.isPage('account', router);

	const handleOnCalendarChange = (calendar: 'dateTo' | 'dateFrom' | 'activityDate') => {
		setCalendarStates(prevState => ({ ...prevState, [calendar]: !prevState[calendar] }));
	};

	const handleOnChipDelete = (type: KeyOf<QueryStringFilters>) => {
		if (type === 'search') {
			setSearchInput('');
		}

		const queryStrings = url.convertFiltersToRouterQueryObject({
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
			value: searchInput
		});
	};

	const handleOnClearFilters = () => {
		setSearchInput('');
		router.push(`/${path}/${subPath}`);
	};

	const handleOnFilterChange = ({ queryString, value }: QueryStringFilterChange) => {
		// Append to URL object if a filter is chosen or if a query string (filter) is already present in the URL
		// This way we dont lose the state of all chosen filters
		const queryStrings = url.convertFiltersToRouterQueryObject({
			filters: queryStringsAsFilters,
			queryString,
			value,
			removeQueryStrings: isAccountPage
				? REMOVE_QUERY_STRINGS_ON_ACCOUNT_PAGE
				: isExplorePage
				? ['past']
				: undefined
		});

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

	const handleOnResetSearchInput = () => {
		setSearchInput('');
		handleOnFilterChange({
			queryString: 'search',
			value: ''
		});
	};

	const renderTagLabel = (type: KeyOf<FilterMenusState> | 'search') => {
		if (type === 'quickFilters') {
			return 'Quick options';
		} else if (type === 'search') {
			return `Search: ${search}`;
		} else if (type === 'sort') {
			return `Sort: ${constants.SORT_BY_VALUES.find(
				item => item.value === sort
			)?.label.toLowerCase()}, ${constants.ORDER_BY_VALUES.find(
				item => item.value === order
			)?.label.toLowerCase()}`;
		} else if (type === 'dateFrom') {
			return `Date from${dateFrom ? `: ${date.formatDate({ date: dateFrom })}` : ''}`;
		} else if (type === 'dateTo') {
			return `Date to${dateTo ? `: ${date.formatDate({ date: dateTo })}` : ''}`;
		} else if (type === 'activityDate') {
			return `Activity date${activityDate ? `: ${date.formatDate({ date: activityDate })}` : ''}`;
		} else if (type === 'activityType') {
			return `Activity${
				activityType
					? `: ${
							activityTypesData?.activityTypes
								?.find(({ type }) => type === activityType)
								?.name.toLowerCase()
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  }`
					: ''
			}`;
		} else if (type === 'transportationType') {
			return `Transportation${
				transportationType
					? `: ${
							transportationTypesData?.transportationTypes
								?.find(({ type }) => type === transportationType)
								?.name.toLowerCase()
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  }`
					: ''
			}`;
		}

		return '';
	};

	const body = (
		<Container maxW='container.xl' as='div' p={isAccountPage ? 0 : undefined}>
			<Flex p={6} flexDirection='column'>
				<VStack spacing={spacing.BODY_SPACING} align='stretch'>
					<Flex>
						<VStack
							spacing={spacing.BODY_SPACING}
							align='stretch'
							as='form'
							w='100%'
							onSubmit={handleOnSubmitSearch}
						>
							<Flex>
								<Input
									name='search'
									type='text'
									placeholder='Search in trips, activities or preparations'
									value={searchInput}
									onChange={handleOnSearchInputChange}
									borderTopRightRadius='none'
									borderBottomRightRadius='none'
									borderRight='none'
									bg='white'
									focusBorderColor='primary.500'
								/>
								<Button
									variant='solid'
									height='100%'
									type='submit'
									borderTopLeftRadius='none'
									borderBottomLeftRadius='none'
								>
									Search
								</Button>
							</Flex>
							{isAccountPage ? (
								<InputSwitch
									onChange={() =>
										handleOnFilterChange({
											queryString: 'past',
											value: !past
										})
									}
									checked={past}
									name='showPastTrips'
									label='Show past trips'
									labelPlacement='end'
								/>
							) : null}
						</VStack>
					</Flex>
					{isExplorePage && (
						<>
							<Divider />
							<Flex justifyContent='space-between'>
								<Wrap>
									<WrapItem>
										<Popover
											width='450px'
											trigger={({ isOpen }) => (
												<FilterTag
													label={renderTagLabel('quickFilters')}
													defaultVariant='solid'
													isPopoverOpen={isOpen}
												/>
											)}
											body={({ onClose }) => (
												<Flex>
													<VStack width='50%' margin='20px 15px 20px 20px' align='stretch'>
														<Text textStyle='body' fontWeight='bold'>
															Search in:
														</Text>
														<Divider />
														<CheckboxGroup colorScheme='green' defaultValue={searchIn}>
															{constants.SEARCH_IN.map(({ label, value }) => {
																const isDisabled =
																	searchIn.length === 1 && searchIn[0] === value;

																return (
																	<Checkbox
																		key={label}
																		isDisabled={isDisabled}
																		value={value}
																		colorScheme='secondary'
																		onChange={e =>
																			handleOnFilterChange({
																				queryString: 'searchIn',
																				value: `${value}-${e.target.checked}`
																			})
																		}
																	>
																		<Text textStyle='body'>{label}</Text>
																	</Checkbox>
																);
															})}
														</CheckboxGroup>
														<Text textStyle='subtitle-sm'>
															At least 1 checkbox must be selected
														</Text>
													</VStack>
													<VStack width='50%' margin='20px 15px 20px 20px' align='stretch'>
														<Text textStyle='body' fontWeight='bold'>
															Date:
														</Text>
														<Divider />
														<VStack spacing={spacing.BUTTON} align='stretch'>
															<Button
																variant='outline'
																onClick={() => {
																	onClose();
																	handleOnFilterChange({
																		queryString: 'dateTo',
																		value: date.getEndOfWeek().toDate()
																	});
																}}
															>
																This week
															</Button>
															<Button
																variant='outline'
																onClick={() => {
																	onClose();
																	handleOnFilterChange({
																		queryString: 'dateTo',
																		value: date.getEndOfMonth().toDate()
																	});
																}}
															>
																This month
															</Button>
															<Button
																variant='outline'
																onClick={() => {
																	const upcomingMonth = date.addUnitToCurrentDate(
																		1,
																		'month'
																	);

																	onClose();
																	handleOnFilterChange({
																		queryString: 'dateTo',
																		value: date
																			.getEndOfMonth(upcomingMonth)
																			.toDate()
																	});
																}}
															>
																Upcoming month
															</Button>
															<Button
																variant='outline'
																onClick={() => {
																	const upcomingMonths = date.addUnitToCurrentDate(
																		3,
																		'month'
																	);

																	onClose();
																	handleOnFilterChange({
																		queryString: 'dateTo',
																		value: date
																			.getEndOfMonth(upcomingMonths)
																			.toDate()
																	});
																}}
															>
																Upcoming 3 months
															</Button>
														</VStack>
													</VStack>
												</Flex>
											)}
										/>
									</WrapItem>
									{search ? (
										<WrapItem>
											<FilterTag
												label={renderTagLabel('search')}
												defaultVariant='solid'
												hasValue={true}
												onClose={() => handleOnChipDelete('search')}
											/>
										</WrapItem>
									) : null}
									<WrapItem>
										<Menu
											button={({ isOpen }) => (
												<FilterTag
													label={renderTagLabel('sort')}
													defaultVariant='solid'
													isPopoverOpen={isOpen}
												/>
											)}
											options={{
												closeOnSelect: false,
												groups: [
													{
														defaultValue: sort,
														title: 'Sort',
														type: 'radio',
														onChange: value =>
															handleOnFilterChange({
																queryString: 'sort',
																value
															}),
														items: constants.SORT_BY_VALUES.map(({ label, value }) => ({
															label,
															value
														}))
													},
													{
														defaultValue: order,
														title: 'Order',
														type: 'radio',
														onChange: value =>
															handleOnFilterChange({
																queryString: 'order',
																value
															}),
														items: constants.ORDER_BY_VALUES.map(({ label, value }) => ({
															label,
															value
														}))
													}
												]
											}}
										/>
									</WrapItem>
									<WrapItem>
										<DatePicker
											selected={dateTo}
											onCalendarOpen={() => handleOnCalendarChange('dateFrom')}
											onCalendarClose={() => handleOnCalendarChange('dateFrom')}
											customInput={
												<FilterTag
													label={renderTagLabel('dateFrom')}
													hasValue={Boolean(dateFrom)}
													isPopoverOpen={calendarStates.dateFrom}
													onClose={() => handleOnChipDelete('dateFrom')}
												/>
											}
											onChange={date =>
												handleOnFilterChange({
													queryString: 'dateFrom',
													value: date as Date
												})
											}
										/>
									</WrapItem>
									<WrapItem>
										<DatePicker
											selected={dateTo}
											onCalendarOpen={() => handleOnCalendarChange('dateTo')}
											onCalendarClose={() => handleOnCalendarChange('dateTo')}
											customInput={
												<FilterTag
													label={renderTagLabel('dateTo')}
													hasValue={Boolean(dateTo)}
													isPopoverOpen={calendarStates.dateTo}
													onClose={() => handleOnChipDelete('dateTo')}
												/>
											}
											onChange={async date =>
												handleOnFilterChange({
													queryString: 'dateTo',
													value: date as Date
												})
											}
										/>
									</WrapItem>
									<WrapItem>
										<DatePicker
											selected={activityDate}
											onCalendarOpen={() => handleOnCalendarChange('activityDate')}
											onCalendarClose={() => handleOnCalendarChange('activityDate')}
											customInput={
												<FilterTag
													label={renderTagLabel('activityDate')}
													hasValue={Boolean(activityDate)}
													isPopoverOpen={calendarStates.activityDate}
													onClose={() => handleOnChipDelete('activityDate')}
												/>
											}
											onChange={async date =>
												handleOnFilterChange({
													queryString: 'activityDate',
													value: date as Date
												})
											}
										/>
									</WrapItem>
									<WrapItem>
										<Menu
											button={({ isOpen }) => (
												<FilterTag
													label={renderTagLabel('activityType')}
													hasValue={Boolean(activityType)}
													isPopoverOpen={isOpen}
													onClose={() => handleOnChipDelete('activityType')}
												/>
											)}
											options={{
												items:
													activityTypesData?.activityTypes.map(({ name, type }) => ({
														label: name,
														value: type,
														isSelected: activityType === type,
														Icon: activityTypeIconMapping.find(
															activity => activity.type === type
														)?.icon,
														onClick: value =>
															handleOnFilterChange({
																queryString: 'activityType',
																value
															})
													})) ?? []
											}}
										/>
									</WrapItem>
									<WrapItem>
										<Menu
											button={({ isOpen }) => (
												<FilterTag
													label={renderTagLabel('transportationType')}
													hasValue={Boolean(transportationType)}
													isPopoverOpen={isOpen}
													onClose={() => handleOnChipDelete('transportationType')}
												/>
											)}
											options={{
												items:
													transportationTypesData?.transportationTypes.map(
														({ name, type }) => ({
															label: name,
															value: type,
															isSelected: transportationType === type,
															Icon: transportationTypeIconMapping.find(
																transportation => transportation.type === type
															)?.icon,
															onClick: value =>
																handleOnFilterChange({
																	queryString: 'transportationType',
																	value
																})
														})
													) ?? []
											}}
										/>
									</WrapItem>
								</Wrap>
								<Box>
									<Tag
										size='md'
										borderRadius='full'
										variant='solid'
										colorScheme='red'
										cursor='pointer'
										onClick={handleOnClearFilters}
										_hover={{
											bgColor: 'red.600'
										}}
									>
										<TagLabel>Clear filters</TagLabel>
										<TagCloseButton />
									</Tag>
								</Box>
							</Flex>
						</>
					)}
				</VStack>
			</Flex>
		</Container>
	);

	return (
		<>
			{isAccountPage ? (
				<AccountPageContainer>{body}</AccountPageContainer>
			) : (
				<ExplorePageContainer>{body}</ExplorePageContainer>
			)}
		</>
	);
};

ExtendedFilters.whyDidYouRender = true;

export default ExtendedFilters;
