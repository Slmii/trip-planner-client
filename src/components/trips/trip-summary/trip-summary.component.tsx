import React, { useCallback } from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
const Drawer = require('@material-ui/core/Drawer').default;
const Box = require('@material-ui/core/Box').default;
const Typography = require('@material-ui/core/Typography').default;
const List = require('@material-ui/core/List').default;
const Collapse = require('@material-ui/core/Collapse').default;
const LinearProgress = require('@material-ui/core/LinearProgress').default;
const Cancel = require('@material-ui/icons/Cancel').default;
const LockIcon = require('@material-ui/icons/Lock').default;
const LockOpenIcon = require('@material-ui/icons/LockOpen').default;

import Button from '@components/buttons/button';
import IconButton from '@components/buttons/icon-button';
import TripDateAndLocations from '@components/trips/dates-and-locations';
import Activity from '@components/trips/trip-summary/activity';
import Preparation from '@components/trips/trip-summary/preparation';
import TripSummarySkeleton from '@components/trips/trip-summary/skeleton';
import { TripSummaryProps } from '@components/trips/trip-summary';
import { dialog, snackbar, activityInvitation } from '@lib/redux';
import {
	useDeleteActivityMutation,
	useDeleteSubPreparationMutation,
	useEditSubPreparationStatusMutation,
	useTripActivitiesQuery,
	useTripQuery
} from '@generated/graphql';

import { globalStyles } from '@styles/global-styled';
import { helpers } from '@lib/utils';

const TripSummary = ({ tripId, me, onClose }: TripSummaryProps) => {
	const dispatch = useDispatch();

	const { iconMr, buttonMr, bold } = globalStyles();

	const { data: tripData, loading: tripLoading, error } = useTripQuery({
		variables: {
			tripId
		},
		skip: tripId <= 0
	});

	const { data: activitiesData, loading: activitiesLoading } = useTripActivitiesQuery({
		variables: {
			tripId,
			isCreator: tripData?.trip.userId === me?.id
		},
		skip: tripLoading || !tripData
	});

	const [deleteActivity] = useDeleteActivityMutation();

	const [editSubPreparationStatus] = useEditSubPreparationStatusMutation();

	const [deleteSubPreparation] = useDeleteSubPreparationMutation();

	const preperationCompletionPercentage = helpers.calculatePreperationsCompletionPercentage(
		tripData?.trip ? tripData.trip.preparations.map(prep => prep.subPreparations).flat() : []
	);

	const handleOnDrawerClose = (event: React.KeyboardEvent | React.MouseEvent) => {
		if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
			return;
		}

		onClose();
	};

	const handleOnDeleteActivity = useCallback(
		async (activityId: number) => {
			const options: dialog.DialogProps = {
				open: true,
				severity: 'error',
				title: 'Delete activity',
				body: 'Deleting an activity will permanently remove it from your trip.',
				onConfirm: async () => {
					const response = await deleteActivity({
						variables: {
							activityId
						},
						update: cache => {
							cache.evict({ id: `Activity:${activityId}` });
						}
					});

					if (response.data) {
						dispatch(
							snackbar.setSnackbar({
								open: true,
								severity: 'error',
								message: 'Activity has been deleted'
							})
						);
					} else {
						console.error(response.errors);
					}
				}
			};

			dispatch(dialog.setDialog(options));
		},
		[deleteActivity, dispatch]
	);

	const handleOnDeleteSubPreparation = useCallback(
		async (subPreparationId: number) => {
			const options: dialog.DialogProps = {
				open: true,
				severity: 'error',
				title: 'Delete preperation',
				body: 'Deleting a preperation will permanently remove it from your trip.',
				onConfirm: async () => {
					const response = await deleteSubPreparation({
						variables: {
							subPreparationId
						},
						update: cache => {
							cache.evict({ id: `SubPreparation:${subPreparationId}` });
						}
					});

					if (response.data) {
						dispatch(
							snackbar.setSnackbar({
								open: true,
								severity: 'error',
								message: 'Preparation has been deleted'
							})
						);
					} else {
						console.error(response.errors);
					}
				}
			};

			dispatch(dialog.setDialog(options));
		},
		[deleteSubPreparation, dispatch]
	);

	const handleOnStatusChange = useCallback(
		async (subPreparationId: number) => {
			const response = await editSubPreparationStatus({
				variables: {
					subPreparationId
				},
				update: (cache, { data }) => {
					cache.modify({
						id: `SubPreparation:${subPreparationId}`,
						fields: {
							status() {
								return data?.editSubPreparationStatus.status;
							}
						}
					});
				}
			});

			if (response.data) {
				const complete = response.data.editSubPreparationStatus.status;
				dispatch(
					snackbar.setSnackbar({
						open: true,
						severity: complete ? 'success' : 'info',
						message: `Preparation ${complete ? 'complete' : 'in progress'}`
					})
				);
			} else {
				console.error(response.errors);
			}
		},
		[dispatch, editSubPreparationStatus]
	);

	const handeOnAcvitityInvitation = (maxInvitations: number) => {
		const options: activityInvitation.ActivityInvitationProps = {
			open: true,
			maxInvitations
		};

		dispatch(activityInvitation.setActivityInivitation(options));
	};

	let body: JSX.Element = <></>;

	if (error) {
		body = (
			<div>
				<pre>{JSON.stringify(error, null, 4)}</pre>
			</div>
		);
	} else if ((tripLoading || activitiesLoading) && (!tripData || !activitiesData)) {
		body = <TripSummarySkeleton />;
	} else if (tripData && tripData.trip) {
		const { name, public: publicTrip, dateFrom, dateTo, locations, preparations, description } = tripData.trip;

		body = (
			<>
				<Box maxHeight='90%' minHeight='90%' overflow='auto' padding='20px 30px 0 30px'>
					<Box mb={2}>
						<Box display='flex' justifyContent='space-between' alignItems='center'>
							<Box display='flex' alignItems='center'>
								{publicTrip ? <LockOpenIcon className={iconMr} /> : <LockIcon className={iconMr} />}
								<Typography variant='h5' component='h1' noWrap={true} title={name}>
									{name}
								</Typography>
							</Box>
							<IconButton
								tooltip={true}
								icon={<Cancel fontSize='large' />}
								title='Close summary'
								onClick={handleOnDrawerClose}
								color='primary'
							/>
						</Box>
						<Box mb={1}>
							<TripDateAndLocations
								dateFrom={dateFrom}
								dateTo={dateTo}
								locations={locations.map(location => location.name)}
							/>
						</Box>
						<Typography variant='body2'>{description}</Typography>
					</Box>
					<Box mb={2}>
						<Typography variant='h6' component='h2' gutterBottom>
							My trip activities ({activitiesData?.tripActivities.length})
						</Typography>
						<Box>
							{activitiesData?.tripActivities.map((activity, idx) => (
								<Activity
									key={idx}
									activity={activity}
									onDelete={handleOnDeleteActivity}
									onInvitation={handeOnAcvitityInvitation}
								/>
							))}
						</Box>
					</Box>
					<Box>
						<Typography variant='h6' component='h2' gutterBottom>
							My preparations ({tripData.trip.preparations.map(prep => prep.subPreparations).flat().length})
						</Typography>
						{preparations.length ? (
							<Box display='flex' alignItems='center'>
								<Box width='82.5%'>
									<LinearProgress className={iconMr} variant='determinate' value={preperationCompletionPercentage} />
								</Box>
								<Typography
									variant='subtitle2'
									className={cn({
										[bold]: true
									})}
								>
									{preperationCompletionPercentage}% complete
								</Typography>
							</Box>
						) : null}
						<Collapse in={true} timeout='auto' unmountOnExit>
							<List>
								{preparations.map((preparation, idx) => (
									<Preparation
										key={idx}
										preparation={preparation}
										onDelete={handleOnDeleteSubPreparation}
										onStatusChange={handleOnStatusChange}
										isLast={idx + 1 === preparations.length}
									/>
								))}
							</List>
						</Collapse>
					</Box>
				</Box>
				<Box padding='0 30px 30px 30px' display='flex' justifyContent='flex-end'>
					<Button className={buttonMr} variant='outlined' fullWidth={false} type='button' onClick={handleOnDrawerClose}>
						Close
					</Button>
					<Button variant='contained' fullWidth={false} type='button'>
						Manage
					</Button>
				</Box>
			</>
		);
	}

	return (
		<Drawer anchor='right' open={tripId > 0} onClose={handleOnDrawerClose}>
			<Box width={550} height='100%' display='flex' flexDirection='column' justifyContent='space-between'>
				{body}
			</Box>
		</Drawer>
	);
};

export default React.memo(TripSummary);
