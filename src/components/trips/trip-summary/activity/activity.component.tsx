import React from 'react';
import { FaHiking } from 'react-icons/fa';
const Box = require('@material-ui/core/Box').default;
const Typography = require('@material-ui/core/Typography').default;
const AccordionDetails = require('@material-ui/core/AccordionDetails').default;
const Avatar = require('@material-ui/core/Avatar').default;
const Tooltip = require('@material-ui/core/Tooltip').default;
const AvatarGroup = require('@material-ui/lab/AvatarGroup').default;
const Divider = require('@material-ui/core/Divider').default;
const ExpandMoreIcon = require('@material-ui/icons/ExpandMore').default;
const DeleteIcon = require('@material-ui/icons/Delete').default;
const ShareIcon = require('@material-ui/icons/Share').default;
const LockIcon = require('@material-ui/icons/Lock').default;
const LockOpenIcon = require('@material-ui/icons/LockOpen').default;
const DateRangeIcon = require('@material-ui/icons/DateRange').default;
const PublicIcon = require('@material-ui/icons/Public').default;
const BeachIcon = require('@material-ui/icons/BeachAccess').default;
const LocationCityIcon = require('@material-ui/icons/LocationCity').default;
const NaturePeopleIcon = require('@material-ui/icons/NaturePeople').default;
const TaxiIcon = require('@material-ui/icons/LocalTaxi').default;
const BusIcon = require('@material-ui/icons/DirectionsBus').default;
const WalkIcon = require('@material-ui/icons/DirectionsWalk').default;
const MotorcycleIcon = require('@material-ui/icons/Motorcycle').default;

import IconButton from '@components/buttons/icon-button';
import { TypeMapping, Styled, ActivityProps } from '@components/trips/trip-summary/activity';
import { helpers } from '@lib/utils';

import { globalStyles } from '@styles/global-styled';

export const activityTypeIconMapping: TypeMapping[] = [
	{ type: 'hiking', icon: <FaHiking size='1rem' /> },
	{ type: 'beach', icon: <BeachIcon fontSize='inherit' /> },
	{ type: 'tour', icon: <LocationCityIcon fontSize='inherit' /> },
	{ type: 'nature', icon: <NaturePeopleIcon fontSize='inherit' /> }
];
export const transportationTypeIconMapping: TypeMapping[] = [
	{ type: 'taxi', icon: <TaxiIcon fontSize='inherit' /> },
	{ type: 'bus', icon: <BusIcon fontSize='inherit' /> },
	{ type: 'foot', icon: <WalkIcon fontSize='inherit' /> },
	{ type: 'motorbike', icon: <MotorcycleIcon fontSize='inherit' /> }
];

const Activity = ({ activity, onDelete }: ActivityProps) => {
	const {
		id,
		name,
		description,
		location,
		date,
		timezone,
		public: publicActivity,
		maxPeople,
		users,
		activityType,
		transportationType
	} = activity;

	const { accordionHeading, accordionDetails } = Styled.activityStyles();

	const { iconMr, iconMl, divider } = globalStyles();

	return (
		<Styled.Accordion>
			<Styled.AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls='my-trip-activities-content'
				id='my-trip-activities-header'
				title={name}
			>
				<Box display='flex' alignItems='flex-end'>
					{publicActivity ? <LockOpenIcon className={iconMr} /> : <LockIcon className={iconMr} />}
					<Styled.AccordionTitle>
						<Typography className={accordionHeading}>{name}</Typography>
					</Styled.AccordionTitle>
				</Box>
			</Styled.AccordionSummary>
			<AccordionDetails className={accordionDetails}>
				<Box mb={1}>
					<Box display='flex' alignItems='center'>
						<DateRangeIcon className={iconMr} fontSize='inherit' />
						<Typography variant='subtitle1' color='textSecondary'>
							{helpers.formatDate({
								date,
								timezone,
								format: helpers.isCurrentYear(date as Date) ? 'DD MMM, HH:mm' : 'DD MMM YYYY, HH:mm'
							})}
						</Typography>
					</Box>
					<Box display='flex' alignItems='center'>
						<PublicIcon className={iconMr} fontSize='inherit' />
						<Typography variant='subtitle1' color='textSecondary'>
							{location}
						</Typography>
					</Box>
				</Box>
				<Typography variant='body2'>{description}</Typography>
				<Divider className={divider} variant='fullWidth' />
				<Box display='flex' justifyContent='space-between' mb={1} alignItems='center'>
					<Box display='flex' height='100%'>
						<Tooltip
							title={
								<>
									<Typography variant='subtitle1'>
										{users.length}/{maxPeople} joining
									</Typography>
									{users.map((user, idx) => (
										<Box key={idx}>{user.name}</Box>
									))}
								</>
							}
							arrow
							placement='left'
						>
							{users.length ? (
								<AvatarGroup max={3}>
									{users.map((user, idx) => (
										<Avatar key={idx}>
											{user.name
												.split(' ')
												.map(n => n[0])
												.join('')}
										</Avatar>
									))}
								</AvatarGroup>
							) : publicActivity ? (
								<Typography variant='subtitle2'>No one has joined yet</Typography>
							) : (
								<Typography variant='subtitle2'>It is not possible for others to join a private activity</Typography>
							)}
						</Tooltip>
						{users.length && publicActivity ? (
							<>
								<Divider className={`${iconMl} ${iconMr}`} orientation='vertical' flexItem />
								<AvatarGroup>
									<Tooltip title={`Activity: ${activityType.name.toLowerCase()}`} arrow placement='bottom'>
										<Avatar>{activityTypeIconMapping.find(({ type }) => type === activityType.type)?.icon}</Avatar>
									</Tooltip>
									<Tooltip title={`Transport: ${transportationType.name.toLowerCase()}`} arrow placement='bottom'>
										<Avatar>
											{transportationTypeIconMapping.find(({ type }) => type === transportationType.type)?.icon}
										</Avatar>
									</Tooltip>
								</AvatarGroup>
							</>
						) : null}
					</Box>
					<Box display='flex' alignItems='center'>
						<IconButton
							color='error'
							aria-label='delete activity'
							tooltip={true}
							icon={<DeleteIcon fontSize='small' />}
							title='Delete'
							onClick={() => onDelete(id)}
						/>
						<IconButton color='primary' tooltip={true} icon={<ShareIcon fontSize='small' />} title='Share' />
					</Box>
				</Box>
			</AccordionDetails>
		</Styled.Accordion>
	);
};

export default React.memo(Activity);
