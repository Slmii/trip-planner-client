import Box from '@material-ui/core/Box';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Card, { CardProps } from '@components/cards/card';
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
import { dialog, snackbar } from '@lib/redux';

const Cards = ({ trips }: { trips: Trip[] }) => {
	const router = useRouter();

	const dispatch = useDispatch();

	const [selectedTrip, setSelectedTrip] = useState<number>(0);

	const [deleteTrip] = useDeleteTripMutation();

	const [addFavorite] = useAddFavoriteMutation();

	const [deleteFavorite] = useDeleteFavoriteMutation();

	const { data: meData } = useMeQuery();

	const { data: upcomingTripData } = useMyUpcomingTripQuery();

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
					dispatch(
						snackbar.setSnackbar({
							open: true,
							severity: 'error',
							message: 'Trip has been deleted'
						})
					);
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
			dispatch(
				snackbar.setSnackbar({
					open: true,
					severity: 'success',
					message: 'Trip has been added to favorites'
				})
			);
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
			dispatch(
				snackbar.setSnackbar({
					open: true,
					severity: 'error',
					message: 'Trip has been deleted from favorites',
					onUndo: () => handleOnAddFavorite(tripId, false)
				})
			);
		} else {
			console.error(response.errors);
		}
	};

	return (
		<>
			<Box display='flex' flexDirection='column'>
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
			</Box>
			<TripSummary tripId={selectedTrip} me={meData?.me} onClose={() => setSelectedTrip(0)} />
		</>
	);
};

export default React.memo(Cards);
