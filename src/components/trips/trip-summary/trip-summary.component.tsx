import {
    Accordion,
    Box,
    Divider,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Heading,
    HStack,
    Link,
    List,
    Progress,
    Text,
    useToast,
    VStack
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React, { useCallback } from 'react';
import { MdLock, MdLockOpen } from 'react-icons/md';
import { useDispatch } from 'react-redux';

import Button from '@components/buttons/button';
import Toast, { constants } from '@components/feedback/toast';
import Icon from '@components/icon';
import TripDateAndLocations from '@components/trips/dates-and-locations';
import { TripSummaryProps } from '@components/trips/trip-summary';
import Activity from '@components/trips/trip-summary/activity';
import Preparation from '@components/trips/trip-summary/preparation';
import TripSummarySkeleton from '@components/trips/trip-summary/skeleton';
import {
    ActivityFragment,
    useDeleteActivityMutation,
    useDeleteSubPreparationMutation,
    useEditSubPreparationStatusMutation,
    useTripActivitiesQuery,
    useTripQuery
} from '@generated/graphql';
import { activityInvitation, dialog } from '@lib/redux';
import { helpers } from '@lib/utils';

import spacing from '@theme/spacing';

const TripSummary = ({ tripId, me, onClose }: TripSummaryProps) => {
	const dispatch = useDispatch();

	const toast = useToast();

	const { data: tripData, loading: tripLoading, error } = useTripQuery({
		variables: {
			tripId,
			isCreator: Boolean(me)
		},
		skip: tripId <= 0
	});
	const [deleteActivity] = useDeleteActivityMutation();
	const [editSubPreparationStatus] = useEditSubPreparationStatusMutation();
	const [deleteSubPreparation] = useDeleteSubPreparationMutation();
	const { data: activitiesData, loading: activitiesLoading } = useTripActivitiesQuery({
		variables: {
			tripId,
			isCreator: tripData?.trip?.userId === me?.id
		},
		skip: tripLoading || !tripData
	});

	const isLoading = (tripLoading || activitiesLoading) && (!tripData || !activitiesData);
	const preperationCompletionPercentage = helpers.calculatePreperationsCompletionPercentage(
		tripData?.trip ? tripData.trip.preparations.map(prep => prep.subPreparations).flat() : []
	);

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
						toast({
							...constants.TOAST_OPTIONS,
							render: () =>
								(<Toast message='Activity has been deleted' severity='error' />) as React.ReactNode
						});
					} else {
						console.error(response.errors);
					}
				}
			};

			dispatch(dialog.setDialog(options));
		},
		[deleteActivity, dispatch, toast]
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
						toast({
							...constants.TOAST_OPTIONS,
							render: () =>
								(<Toast message='Preparation has been deleted' severity='error' />) as React.ReactNode
						});
					} else {
						console.error(response.errors);
					}
				}
			};

			dispatch(dialog.setDialog(options));
		},
		[deleteSubPreparation, dispatch, toast]
	);

	const handleOnSubPreparationStatusChange = useCallback(
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
				toast({
					...constants.TOAST_OPTIONS,
					render: () =>
						(
							<Toast
								message={`Preparation ${complete ? 'complete' : 'in progress'}`}
								severity={complete ? 'success' : 'info'}
							/>
						) as React.ReactNode
				});
			} else {
				console.error(response.errors);
			}
		},
		[editSubPreparationStatus, toast]
	);

	const handeOnAcvitityInvitation = (activity: ActivityFragment) => {
		const options: activityInvitation.ActivityInvitationProps = {
			open: true,
			activity
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
	} else if (isLoading) {
		body = (
			<>
				<DrawerHeader></DrawerHeader>
				<DrawerBody>
					<TripSummarySkeleton />
				</DrawerBody>
			</>
		);
	} else if (tripData && tripData.trip) {
		const { name, public: publicTrip, dateFrom, dateTo, locations, preparations, description } = tripData.trip;

		body = (
			<>
				<DrawerHeader borderBottomWidth='1px' display='flex' alignItems='center'>
					<Icon as={publicTrip ? MdLockOpen : MdLock} mr size='lg' />
					<Heading as='h1'>{name}</Heading>
				</DrawerHeader>
				<DrawerBody>
					<VStack spacing={spacing.BODY_SPACING_LARGE} align='stretch'>
						<TripDateAndLocations
							dateFrom={dateFrom}
							dateTo={dateTo}
							locations={locations.map(location => location.name)}
						/>
						<Text textStyle='body'>{description}</Text>
						<Divider />
						<VStack align='stretch'>
							<Heading as='h2' textStyle='title'>
								My activities
							</Heading>
							<Accordion defaultIndex={[]} allowMultiple>
								{activitiesData?.tripActivities.length ? (
									activitiesData.tripActivities.map((activity, idx) => (
										<Activity
											key={idx}
											activity={activity}
											onDelete={handleOnDeleteActivity}
											onInvitation={handeOnAcvitityInvitation}
											isInvitationDisabled={activity.users.length >= activity.maxPeople}
											isProfilePrivate={!me?.public}
										/>
									))
								) : (
									<Text textStyle='body'>
										Nothing here yet. Start{' '}
										<Link as={NextLink} href={`/account/trip/${tripData.trip.id}`} passHref>
											<Box as='a' color='primary.500' fontWeight='bold'>
												adding activities
											</Box>
										</Link>{' '}
										to your trip!
									</Text>
								)}
							</Accordion>
						</VStack>
						<VStack align='stretch'>
							<Heading as='h2' textStyle='title'>
								My preparations
							</Heading>
							{preparations.length ? (
								<>
									<Flex alignItems='center'>
										<Box flex='1' mr={2}>
											<Progress
												colorScheme='secondary'
												size='xs'
												value={preperationCompletionPercentage}
												rounded='full'
											/>
										</Box>
										<Text textStyle='subtitle'>{preperationCompletionPercentage}% complete</Text>
									</Flex>
									<List>
										{preparations.map((preparation, idx) => (
											<Preparation
												key={idx}
												preparation={preparation}
												onDelete={handleOnDeleteSubPreparation}
												onStatusChange={handleOnSubPreparationStatusChange}
												isLast={idx + 1 === preparations.length}
											/>
										))}
									</List>
								</>
							) : (
								<Text textStyle='body'>
									Nothing here yet. Start{' '}
									<Link as={NextLink} href={`/account/trip/${tripData.trip.id}`} passHref>
										<Box as='a' color='primary.500' fontWeight='bold'>
											adding preparations
										</Box>
									</Link>{' '}
									to your trip!
								</Text>
							)}
						</VStack>
					</VStack>
				</DrawerBody>
				<DrawerFooter borderTopWidth='1px'>
					<HStack spacing={spacing.BUTTON}>
						<Button variant='ghost' onClick={onClose}>
							Close
						</Button>
						<Button>Manage</Button>
					</HStack>
				</DrawerFooter>
			</>
		);
	}

	return (
		<Drawer placement='right' size='md' isOpen={tripId > 0} onClose={onClose}>
			<DrawerOverlay>
				<DrawerContent>{body}</DrawerContent>
			</DrawerOverlay>
		</Drawer>
	);
};

export default React.memo(TripSummary);
