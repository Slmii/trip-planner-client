import React, { useCallback, useState } from 'react';
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
const ExpandMore = require('@material-ui/icons/ExpandMore').default;
const ExpandLess = require('@material-ui/icons/ExpandLess').default;

import Button from '@components/buttons/button';
import IconButton from '@components/buttons/icon-button';
import TripDateAndLocations from '@components/trips/dates-and-locations';
import Activity from '@components/trips/trip-summary/activity';
import Preparation from '@components/trips/trip-summary/preparation';
import TripSummarySkeleton from '@components/trips/trip-summary/skeleton';
import { TripSummaryProps } from '@components/trips/trip-summary';
import { dialog, snackbar } from '@lib/redux';
import {
	useDeleteActivityMutation,
	useDeletePreparationMutation,
	useEditPreparationStatusMutation,
	useTripActivitiesQuery,
	useTripQuery
} from '@generated/graphql';

import { globalStyles } from '@styles/global-styled';

const COLLAPSED_PREPS = 3;

const TripSummary = ({ tripId, me, onClose }: TripSummaryProps) => {
	const [showAllPreps, setShowAllPreps] = useState(false);
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

	const [editPreparationStatus] = useEditPreparationStatusMutation();

	const [deletePreparation] = useDeletePreparationMutation();

	const preperationCompletionPercentage = Math.round(
		((tripData?.trip.preparations.filter(preparation => preparation.status).length || 0) /
			(tripData?.trip.preparations ? tripData?.trip.preparations.length : 0)) *
			100
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
				description: 'Deleting an activity will permanently remove it from your trip.',
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

	const handleOnDeletePreparation = useCallback(
		async (preparationId: number) => {
			const options: dialog.DialogProps = {
				open: true,
				severity: 'error',
				title: 'Delete preperation',
				description: 'Deleting a preperation will permanently remove it from your trip.',
				onConfirm: async () => {
					const response = await deletePreparation({
						variables: {
							preparationId
						},
						update: cache => {
							cache.evict({ id: `Preparation:${preparationId}` });
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
		[deletePreparation, dispatch]
	);

	const handleOnStatusChange = useCallback(
		async (preparationId: number) => {
			const response = await editPreparationStatus({
				variables: {
					preparationId
				},
				update: (cache, { data }) => {
					cache.modify({
						id: `Preparation:${preparationId}`,
						fields: {
							status() {
								return data?.editPreparationStatus.status;
							}
						}
					});
				}
			});

			if (response.data) {
				const complete = response.data.editPreparationStatus.status;
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
		[dispatch, editPreparationStatus]
	);

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
							<TripDateAndLocations trip={tripData.trip} />
						</Box>
						<Typography variant='body2'>{description}</Typography>
					</Box>
					<Box mb={2}>
						<Typography variant='h6' component='h2' gutterBottom>
							My trip activities ({activitiesData?.tripActivities.length})
						</Typography>
						<Box>
							{activitiesData?.tripActivities.map((activity, idx) => (
								<Activity key={idx} activity={activity} onDelete={handleOnDeleteActivity} />
							))}
						</Box>
					</Box>
					<Box>
						<Typography variant='h6' component='h2' gutterBottom>
							My preparations ({tripData.trip.preparations.length})
						</Typography>
						{preparations.length ? (
							<Box display='flex' alignItems='center'>
								<Box width='82.5%'>
									<LinearProgress
										className={iconMr}
										variant='determinate'
										value={preperationCompletionPercentage}
										color='secondary'
									/>
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
						<Collapse collapsedHeight={COLLAPSED_PREPS * 68} in={showAllPreps}>
							<List>
								{preparations.map((preparation, idx) => (
									<Preparation
										key={idx}
										preparation={preparation}
										onDelete={handleOnDeletePreparation}
										onStatusChange={handleOnStatusChange}
									/>
								))}
							</List>
						</Collapse>
						{tripData.trip.preparations.length > 3 && (
							<Button
								variant='text'
								size='small'
								color='primary'
								fullWidth={false}
								onClick={() => setShowAllPreps(prevState => !prevState)}
								endIcon={showAllPreps ? <ExpandLess /> : <ExpandMore />}
							>
								Show {showAllPreps ? 'less' : 'more'}
							</Button>
						)}
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
