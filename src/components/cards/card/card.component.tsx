/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import LockIcon from '@material-ui/icons/Lock';
import LockOpen from '@material-ui/icons/LockOpen';
import ShareIcon from '@material-ui/icons/Share';
import cn from 'classnames';
import React from 'react';

import Button from '@components/buttons/button';
import IconButton from '@components/buttons/icon-button';
import { CardProps, Styled } from '@components/cards/card';
import TripDateAndLocations from '@components/trips/dates-and-locations';

import { globalStyles } from '@styles/index';
import { Theme } from '@theme/index';

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
	const theme = useTheme() as Theme;
	const { iconMr, buttonMr, divider } = globalStyles();

	return (
		<Styled.Card
			className={cn({
				'selected-card': isSelected
			})}
		>
			<Styled.CardHeader>
				{isUpcomingTrip && (
					<Box
						position='absolute'
						top={10}
						left={10}
						bgcolor='white'
						padding='0 16px'
						className='noselect'
						borderRadius={theme.shape.borderRadius}
						zIndex={1}
					>
						<Typography className='bold' variant='overline'>
							My upcoming trip
						</Typography>
					</Box>
				)}
				{trip.backgroundUrl && <Styled.Img src={trip.backgroundUrl} layout='fill' />}
			</Styled.CardHeader>
			<Box width='100%' display='flex' justifyContent='space-between' flexDirection='column' padding='20px 30px'>
				<Box>
					<Box display='flex' mb={0.5} alignItems='center'>
						{trip.public ? <LockOpen className={iconMr} /> : <LockIcon className={iconMr} />}
						<Typography variant='h5' component='h2' noWrap={true} title={trip.name}>
							{trip.name}
						</Typography>
					</Box>
					<Box display='flex' flexDirection='column' mb={1}>
						<TripDateAndLocations
							dateFrom={trip.dateFrom}
							dateTo={trip.dateTo}
							locations={trip.locations.map(location => location.name)}
						/>
					</Box>
					<Styled.Description>
						<Typography variant='body2'>{trip.description}</Typography>
					</Styled.Description>
				</Box>
				<Divider className={divider} variant='fullWidth' />
				<Box display='flex' justifyContent='space-between' alignItems='center'>
					<Box display='flex'>
						<Button
							variant={isCreator ? 'outlined' : 'contained'}
							fullWidth={false}
							onClick={() => (isSelected ? onClose() : onView(trip.id))}
							className={buttonMr}
						>
							View
						</Button>
						{isCreator && (
							<Button variant='contained' fullWidth={false}>
								Manage
							</Button>
						)}
					</Box>
					<Box display='flex'>
						{isDeleteAvailable && (
							<IconButton
								color='error'
								aria-label='delete trip'
								tooltip={true}
								icon={<DeleteIcon />}
								title='Delete'
								onClick={() => onDelete(trip.id)}
							/>
						)}
						{trip.isInFavorite ? (
							<IconButton
								color='primary'
								aria-label='remove from favorite'
								tooltip={true}
								icon={<FavoriteIcon />}
								title='Remove from favorite'
								onClick={() => onDeleteFavorite(trip.id)}
							/>
						) : (
							<IconButton
								color='primary'
								aria-label='add to favorite'
								tooltip={true}
								icon={<FavoriteBorderIcon />}
								title='Add to favorite'
								onClick={() => onAddFavorite(trip.id)}
							/>
						)}
						<IconButton
							aria-label='share'
							color='primary'
							tooltip={true}
							icon={<ShareIcon />}
							title='Share trip'
						/>
					</Box>
				</Box>
			</Box>
		</Styled.Card>
	);
};

export default React.memo(Card);
