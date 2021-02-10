/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Box, Divider, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import NextImage from 'next/image';
import React from 'react';
import { MdDelete, MdFavorite, MdFavoriteBorder, MdLock, MdLockOpen, MdShare } from 'react-icons/md';

import Button from '@components/buttons/button';
import IconButton from '@components/buttons/icon-button';
import { CardProps } from '@components/cards/card';
import Icon from '@components/icon';
import Paper from '@components/paper';
import TripDateAndLocations from '@components/trips/dates-and-locations';

import spacing from '@theme/spacing';

const Card = ({
	trip,
	onDelete,
	onView,
	onClose,
	onAddFavorite,
	onDeleteFavorite,
	isSelected,
	isCreator,
	isDeleteAvailable,
	isUpcomingTrip
}: CardProps) => {
	return (
		<Paper
			display='flex'
			width='100%'
			_hover={{
				boxShadow: 'card'
			}}
			transition='box-shadow .3s'
		>
			<Box bg='primary.500' pos='relative' borderTopLeftRadius='base' borderBottomLeftRadius='base'>
				{isUpcomingTrip && (
					<Box
						pos='absolute'
						top={3}
						left={3}
						bg='white'
						py={1}
						px={2}
						userSelect='none'
						rounded='base'
						zIndex={1}
					>
						<Text textStyle='overline' fontWeight='bold'>
							My upcoming trip
						</Text>
					</Box>
				)}
				{trip.backgroundUrl && (
					<Box width='360px'>
						<Box
							as={NextImage}
							alt={trip.user?.name ?? ''}
							src={trip.backgroundUrl}
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							// @ts-ignore
							layout='fill'
							borderTopLeftRadius='base'
							borderBottomLeftRadius='base'
						/>
					</Box>
				)}
			</Box>
			<VStack spacing={spacing.BODY_SPACING} p={spacing.INNER_PADDING} align='flex-start'>
				<Flex alignItems='center'>
					{trip.public ? <Icon as={MdLockOpen} mr size='lg' /> : <Icon as={MdLock} mr size='lg' />}
					<Heading as='h2' textStyle='title'>
						{trip.name}
					</Heading>
				</Flex>
				<TripDateAndLocations
					dateFrom={trip.dateFrom}
					dateTo={trip.dateTo}
					locations={trip.locations.map(location => location.name)}
				/>
				<Text textStyle='body' noOfLines={1}>
					{trip.description}
				</Text>
				<Divider />
				<HStack justify='space-between' w='100%'>
					<Flex>
						{isDeleteAvailable && (
							<IconButton
								colorScheme='red'
								tooltip={true}
								icon={<MdDelete />}
								title='Delete'
								onClick={() => onDelete(trip.id)}
							/>
						)}
						{trip.isInFavorite ? (
							<IconButton
								colorScheme='primary'
								tooltip={true}
								icon={<MdFavorite />}
								title='Remove from favorite'
								onClick={() => onDeleteFavorite(trip.id)}
							/>
						) : (
							<IconButton
								colorScheme='primary'
								tooltip={true}
								icon={<MdFavoriteBorder />}
								title='Add to favorite'
								onClick={() => onAddFavorite(trip.id)}
							/>
						)}
						<IconButton colorScheme='primary' tooltip={true} icon={<MdShare />} title='Share trip' />
					</Flex>
					<HStack spacing={spacing.BUTTON}>
						<Button
							variant={isCreator ? 'ghost' : 'solid'}
							onClick={() => (isSelected ? onClose() : onView(trip.id))}
						>
							View
						</Button>
						{isCreator && <Button variant='solid'>Manage</Button>}
					</HStack>
				</HStack>
			</VStack>
		</Paper>
	);
};

export default React.memo(Card);
