import cn from 'classnames';
import { useState } from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
const Container = require('@material-ui/core/Container').default;
const Chip = require('@material-ui/core/Chip').default;
const Box = require('@material-ui/core/Box').default;
const ArrowDropDownIcon = require('@material-ui/icons/ArrowDropDown').default;
const ArrowDropUpIcon = require('@material-ui/icons/ArrowDropUp').default;
const SearchIcon = require('@material-ui/icons/Search').default;
const TuneIcon = require('@material-ui/icons/Tune').default;

import { InputField } from '@components/inputs';
import { Button } from '@components/button';
import { Menu } from '@components/menu';
// import { useActivityTypesQuery, useTransportationTypesQuery } from '@generated/graphql';

import * as S from './extended-filters.styled';
import theme from '@theme/index';
import { globalStyles } from '@styles/global-styled';

type ExtendedFiltersState = {
	search: string;
	departureDate: MaterialUiPickersDate;
	returnDate: MaterialUiPickersDate;
	activityDate: MaterialUiPickersDate;
	activityType: string | null;
	transportationType: string | null;
};

type AnchorElementState = {
	filters: null | HTMLElement;
	types: null | HTMLElement;
};

const ExtendedFilters = () => {
	const [anchorEls, setAnchorEls] = useState<AnchorElementState>({
		types: null,
		filters: null
	});
	const [filters, setFilters] = useState<ExtendedFiltersState>({
		search: '',
		departureDate: null,
		returnDate: null,
		activityDate: null,
		activityType: null,
		transportationType: null
	});

	// const { data: activityTypesData } = useActivityTypesQuery();
	// const { data: transportationTypesData } = useTransportationTypesQuery();

	const { buttonMr, buttonNoBorder } = globalStyles();

	const handleOnMenuItemClick = (type: 'activityType' | 'transportationType', value: string) => {
		setFilters(prevState => ({
			...prevState,
			[type]: value
		}));
	};

	return (
		<Box width='100%' bgcolor='white' borderBottom={`1px solid ${theme.palette.borderColor}`} position='relative' zIndex={1}>
			<Container component='div' fixed disableGutters={true}>
				<Box p={1.5} display='flex'>
					<Box width='50%' className={buttonMr}>
						<InputField
							label='Search for trips, activities or preparations'
							placeholder='...'
							type='text'
							name='search'
							size='small'
							value={filters.search}
							onChange={e => setFilters(prevState => ({ ...prevState, search: e.target.value }))}
							startAdornment={<SearchIcon className={buttonMr} />}
						/>
					</Box>
					<Button
						variant='outlined'
						color='inherit'
						className={`${buttonMr} ${buttonNoBorder}`}
						fullWidth={false}
						endIcon={<TuneIcon />}
					>
						Filters
					</Button>
					<Button
						variant='outlined'
						color='inherit'
						fullWidth={false}
						endIcon={<ArrowDropDownIcon />}
						className={buttonNoBorder}
						aria-controls='type-menu'
						aria-haspopup='true'
						onClick={e => setAnchorEls(prevState => ({ ...prevState, types: e.currentTarget }))}
					>
						{Object.entries(filters).map(([key, value]) => {
							if ((key === 'activityType' || key === 'transportationType') && value) {
								return (
									<Chip
										className={cn({
											[buttonMr]: key === 'activityType'
										})}
										label={value}
										color='primary'
										variant='outlined'
										onDelete={() => setFilters(prevState => ({ ...prevState, [key]: null }))}
									/>
								);
							}
						})}
						{!filters.activityType && !filters.transportationType && 'Types'}
					</Button>
					<Menu
						anchorEl={anchorEls.types}
						type='types'
						onClose={() => setAnchorEls(prevState => ({ ...prevState, types: null }))}
						menu={[
							{
								subHeader: 'Activity',
								onMenuItemClick: value => handleOnMenuItemClick('activityType', value),
								menuItems: [
									{
										label: 'Nature tour',
										value: 'nature'
									}
								]
							},
							{
								subHeader: 'Transporation',
								onMenuItemClick: value => handleOnMenuItemClick('transportationType', value),
								menuItems: [
									{
										label: 'Taxi',
										value: 'taxi'
									}
								]
							}
						]}
					/>
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
								value={filters.departureDate}
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
								value={filters.returnDate}
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
								value={filters.returnDate}
								size='small'
								InputAdornmentProps={{ position: 'end' }}
								onChange={date => setFilters(prevState => ({ ...prevState, activityDate: date }))}
								invalidDateMessage='Please select an activity date'
							/>
						</Box>
						<Box>
							<InputSelect
								label='Activity type'
								size='small'
								variant='outlined'
								fullWidth={true}
								menuItems={[
									{ label: <em>None</em>, value: '' },
									{ label: 'Hiking', value: 'hiking' },
									{ label: 'Beach', value: 'beach' },
									{ label: 'City tour', value: 'tour' },
									{ label: 'Nature tour', value: 'nature' }
								]}
								value={filters.activityType}
								onChange={e => {
									const activityType = e.target.value as ActivityType;
									setFilters(prevState => ({ ...prevState, activityType }));
								}}
							/>
						</Box>
						<Box>
							<InputSelect
								label='Transportation type'
								size='small'
								variant='outlined'
								fullWidth={true}
								menuItems={[
									{ label: <em>None</em>, value: '' },
									{ label: 'Hiking', value: 'hiking' },
									{ label: 'Beach', value: 'beach' },
									{ label: 'City tour', value: 'tour' },
									{ label: 'Nature tour', value: 'nature' }
								]}
								value={filters.transportationType}
								onChange={e => {
									const transportationType = e.target.value as TransportationType;
									setFilters(prevState => ({ ...prevState, transportationType }));
								}}
							/>
						</Box>
					</S.Filters>
					<Box display='flex' justifyContent='flex-end' width='100%'>
						<Button
							type='button'
							variant='outlined'
							fullWidth={false}
							className={buttonMr}
							onClick={e =>
								setFilters({
									search: '',
									departureDate: null,
									returnDate: null,
									activityDate: null,
									activityType: '',
									transportationType: ''
								})
							}
						>
							Reset
						</Button>
						<Button type='button' fullWidth={false} loading={false} onClick={handleOnApplyFilters}>
							Apply
						</Button>
					</Box> */}
				</Box>
			</Container>
		</Box>
	);
};

export default ExtendedFilters;
