import { useToast, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Card, { CardProps } from '@components/cards/card';
import Toast, { constants } from '@components/feedback/toast';
import TripSummary from '@components/trips/trip-summary';
import {
    Trip,
    TripFragment,
    TripFragmentDoc,
    TripsResponse,
    useAddFavoriteMutation,
    useDeleteFavoriteMutation,
    useDeleteTripMutation,
    useMeQuery,
    useMyUpcomingTripQuery
} from '@generated/graphql';
import { dialog } from '@lib/redux';

import spacing from '@theme/spacing';

const Cards = ({ trips }: { trips: Trip[] }) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [selectedTrip, setSelectedTrip] = useState(0);

	const [deleteTrip] = useDeleteTripMutation();
	const [addFavorite] = useAddFavoriteMutation();
	const [deleteFavorite] = useDeleteFavoriteMutation();
	const { data: meData } = useMeQuery();
	const { data: upcomingTripData } = useMyUpcomingTripQuery();

	const toast = useToast();

	const handleOnDeleteTrip = async (tripId: number) => {
		const options: dialog.DialogProps = {
			open: true,
			severity: 'error',
			title: 'Delete trip',
			body: 'Deleting a trip will permanently remove it from your account.',
			onConfirm: async () => {
				const response = await deleteTrip({
					variables: {
						tripId
					},
					update: cache => {
						cache.evict({ id: `Trip:${tripId}` });
					}
				});

				if (response.data) {
					toast({
						...constants.TOAST_OPTIONS,
						render: () => (<Toast message='Trip has been deleted' severity='error' />) as React.ReactNode
					});
				} else {
					console.error(response.errors);
				}
			}
		};

		dispatch(dialog.setDialog(options));
	};

	const handleOnAddFavorite = async (tripId: number, showSnackbar = true) => {
		const response = await addFavorite({
			variables: {
				tripId
			},
			update: cache => {
				const id = `Trip:${tripId}`;

				cache.modify({
					id,
					fields: {
						isInFavorite() {
							return true;
						}
					}
				});

				cache.modify({
					fields: {
						myFavorites(existing: TripsResponse, { readField }): TripsResponse | undefined {
							const cachedTrip = cache.readFragment<TripFragment>({
								id,
								fragment: TripFragmentDoc,
								fragmentName: 'Trip'
							});

							if (!cachedTrip) {
								return;
							}

							if (existing.trips.some(trip => readField('id', trip) === cachedTrip.id)) {
								return existing;
							}

							return {
								...existing,
								totalCount: existing.totalCount + 1,
								trips: [cachedTrip as Trip, ...existing.trips]
							};
						}
					}
				});
			}
		});

		if (showSnackbar && response.data) {
			toast({
				...constants.TOAST_OPTIONS,
				render: () =>
					(<Toast message='Trip has been added to favorites' severity='success' />) as React.ReactNode
			});
		} else {
			console.error(response.errors);
		}
	};

	const handleOnDeleteFavorite = async (tripId: number) => {
		const response = await deleteFavorite({
			variables: {
				tripId
			},
			update: cache => {
				const id = `Trip:${tripId}`;

				cache.modify({
					id,
					fields: {
						isInFavorite() {
							return false;
						}
					}
				});

				cache.modify({
					fields: {
						myFavorites(existing: TripsResponse, { readField }): TripsResponse {
							const filteredTrips = existing.trips.filter(trip => readField('id', trip) !== tripId);

							return {
								...existing,
								totalCount: existing.totalCount - 1,
								trips: [...filteredTrips]
							};
						}
					}
				});
			}
		});

		if (response.data) {
			toast({
				...constants.TOAST_OPTIONS,
				render: () =>
					(<Toast message='Trip has been deleted from favorites' severity='error' />) as React.ReactNode
			});
		} else {
			console.error(response.errors);
		}
	};

	return (
		<>
			<VStack spacing={spacing.CARD}>
				{trips.map(trip => {
					const isCreator = trip.userId === meData?.me?.id;
					const props: CardProps = {
						trip,
						onDelete: handleOnDeleteTrip,
						onView: (tripId: number) => setSelectedTrip(tripId),
						onClose: () => setSelectedTrip(0),
						onAddFavorite: handleOnAddFavorite,
						onDeleteFavorite: handleOnDeleteFavorite,
						isSelected: selectedTrip === trip.id,
						isCreator,
						isDeleteAvailable: router.query.trips !== 'favorites' && isCreator,
						isUpcomingTrip: upcomingTripData?.myUpcomingTrip?.id === trip.id
					};
					return <Card key={trip.id} {...props} />;
				})}
			</VStack>
			<TripSummary tripId={selectedTrip} me={meData?.me} onClose={() => setSelectedTrip(0)} />
		</>
	);
};

export default React.memo(Cards);
