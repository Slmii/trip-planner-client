import React from 'react';
import { FaHiking } from 'react-icons/fa';

import IconButton from '@components/buttons/icon-button';
import TripDateAndLocations from '@components/trips/dates-and-locations';
import { ActivityProps, Styled, TypeMapping } from '@components/trips/trip-summary/activity';
import { helpers } from '@lib/utils';

import { globalStyles } from '@styles/index';

const Box = require('@material-ui/core/Box').default;
const Typography = require('@material-ui/core/Typography').default;
const AccordionDetails = require('@material-ui/core/AccordionDetails').default;
const Avatar = require('@material-ui/core/Avatar').default;
const Tooltip = require('@material-ui/core/Tooltip').default;
const AvatarGroup = require('@material-ui/lab/AvatarGroup').default;
const Divider = require('@material-ui/core/Divider').default;
const ExpandMoreIcon = require('@material-ui/icons/ExpandMore').default;
const DeleteIcon = require('@material-ui/icons/Delete').default;
const MailIcon = require('@material-ui/icons/Mail').default;
const LockIcon = require('@material-ui/icons/Lock').default;
const LockOpenIcon = require('@material-ui/icons/LockOpen').default;
const BeachIcon = require('@material-ui/icons/BeachAccess').default;
const LocationCityIcon = require('@material-ui/icons/LocationCity').default;
const NaturePeopleIcon = require('@material-ui/icons/NaturePeople').default;
const TaxiIcon = require('@material-ui/icons/LocalTaxi').default;
const BusIcon = require('@material-ui/icons/DirectionsBus').default;
const WalkIcon = require('@material-ui/icons/DirectionsWalk').default;
const MotorcycleIcon = require('@material-ui/icons/Motorcycle').default;

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

const Activity = ({ activity, isInvitationDisabled, isProfilePrivate, onDelete, onInvitation }: ActivityProps) => {
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
					<TripDateAndLocations dateFrom={date} timezone={timezone} locations={[location]} />
				</Box>
				<Typography variant='body2'>{description}</Typography>
				<Divider className={divider} variant='fullWidth' />
				<Box display='flex' justifyContent='space-between' alignItems='center'>
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
									{users.map((user, idx) =>
										!user.public ? (
											<Avatar key={idx} />
										) : (
											<Avatar key={idx} alt={user.name ?? ''} src={user.profileImgUrl ?? ''}>
												{helpers.transformToAvatarInitials(user.name ?? '')}
											</Avatar>
										)
									)}
								</AvatarGroup>
							) : publicActivity ? (
								<Typography variant='subtitle2'>No one has joined yet</Typography>
							) : (
								<Box display='flex' flexDirection='column'>
									<Typography variant='subtitle2'>No one has joined yet.</Typography>
									<Typography variant='subtitle2'>
										Private activities are only joinable by invitations
									</Typography>
								</Box>
							)}
						</Tooltip>
						{users.length ? (
							<>
								<Divider className={`${iconMl} ${iconMr}`} orientation='vertical' flexItem />
								<AvatarGroup>
									<Tooltip
										title={`Activity: ${activityType.name.toLowerCase()}`}
										arrow
										placement='bottom'
									>
										<Avatar>
											{
												activityTypeIconMapping.find(({ type }) => type === activityType.type)
													?.icon
											}
										</Avatar>
									</Tooltip>
									<Tooltip
										title={`Transport: ${transportationType.name.toLowerCase()}`}
										arrow
										placement='bottom'
									>
										<Avatar>
											{
												transportationTypeIconMapping.find(
													({ type }) => type === transportationType.type
												)?.icon
											}
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
						{isInvitationDisabled || isProfilePrivate ? (
							<IconButton
								color='primary'
								tooltip={true}
								icon={<MailIcon fontSize='small' />}
								title={
									isInvitationDisabled
										? `${maxPeople} people have already joined`
										: 'Account needs to be public in order to send out invitations'
								}
								disabled={true}
							/>
						) : (
							<IconButton
								color='primary'
								tooltip={true}
								icon={<MailIcon fontSize='small' />}
								title='Invite'
								onClick={() => onInvitation(activity)}
							/>
						)}
					</Box>
				</Box>
			</AccordionDetails>
		</Styled.Accordion>
	);
};

export default React.memo(Activity);
