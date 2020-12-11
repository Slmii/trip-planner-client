/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import cn from 'classnames';
const Box = require('@material-ui/core/Box').default;
const Typography = require('@material-ui/core/Typography').default;
const Divider = require('@material-ui/core/Divider').default;
const LockIcon = require('@material-ui/icons/Lock').default;
const LockOpen = require('@material-ui/icons/LockOpen').default;
const DateRangeIcon = require('@material-ui/icons/DateRange').default;
const PublicIcon = require('@material-ui/icons/Public').default;
const FavoriteIcon = require('@material-ui/icons/Favorite').default;
const FavoriteBorderIcon = require('@material-ui/icons/FavoriteBorder').default;
const ShareIcon = require('@material-ui/icons/Share').default;
const DeleteIcon = require('@material-ui/icons/Delete').default;
const { useTheme } = require('@material-ui/core/styles');

import { Button, IconButton } from '@components/button';
import { helpers } from '@lib/utils';
import { CardProps } from '@lib/types';

import * as S from './card.styled';
import { Theme } from '@theme/index';
import { globalStyles } from '@styles/global-styled';

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
		<S.Card
			className={cn({
				'selected-card': isSelected
			})}
		>
			<S.CardHeader>
				{isUpcomingTrip && (
					<Box
						position='absolute'
						top={10}
						left={10}
						bgcolor='white'
						padding='0 16px'
						className='noselect'
						borderRadius={theme.shape.borderRadius}
					>
						<Typography className='bold' variant='overline'>
							My upcoming trip
						</Typography>
					</Box>
				)}
				{trip.backgroundUrl && <S.Img src={trip.backgroundUrl} layout='fill' />}
			</S.CardHeader>
			<Box width='100%' display='flex' justifyContent='space-between' flexDirection='column' padding='20px 30px'>
				<Box>
					<Box display='flex' mb={0.5} alignItems='center'>
						{trip.public ? <LockOpen className={iconMr} /> : <LockIcon className={iconMr} />}
						<Typography variant='h5' component='h2' noWrap={true} title={trip.name}>
							{trip.name}
						</Typography>
					</Box>
					<Box display='flex' flexDirection='column' mb={1}>
						<Box display='flex' alignItems='center'>
							<DateRangeIcon className={iconMr} fontSize='inherit' />
							<Typography variant='subtitle1' color='textSecondary'>
								{helpers.formatDate({
									date: trip.dateFrom,
									format: 'DD MMM'
								})}{' '}
								-{' '}
								{helpers.formatDate({
									date: trip.dateTo,
									format: 'DD MMM'
								})}
							</Typography>
						</Box>
						<Box display='flex' alignItems='center'>
							<PublicIcon fontSize='inherit' className={iconMr} />
							<Typography variant='subtitle1' color='textSecondary'>
								{trip.locations.length ? trip.locations.map(location => location.name).join(' - ') : '-'}
							</Typography>
						</Box>
					</Box>
					<S.Description>
						<Typography variant='body2'>{trip.description}</Typography>
					</S.Description>
				</Box>
				<Divider className={divider} variant='fullWidth' />
				<Box display='flex' justifyContent='space-between' alignItems='center'>
					<Box display='flex'>
						<Button
							variant={isCreator ? 'outlined' : 'contained'}
							color='secondary'
							fullWidth={false}
							size='large'
							onClick={() => (isSelected ? onClose() : onView(trip.id))}
							className={buttonMr}
						>
							View
						</Button>
						{isCreator && (
							<Button variant='contained' color='secondary' size='large' fullWidth={false}>
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
								color='secondary'
								aria-label='remove from favorite'
								tooltip={true}
								icon={<FavoriteIcon />}
								title='Remove from favorite'
								onClick={() => onDeleteFavorite(trip.id)}
							/>
						) : (
							<IconButton
								color='secondary'
								aria-label='add to favorite'
								tooltip={true}
								icon={<FavoriteBorderIcon />}
								title='Add to favorite'
								onClick={() => onAddFavorite(trip.id)}
							/>
						)}
						<IconButton color='secondary' aria-label='share' tooltip={true} icon={<ShareIcon />} title='Share trip' />
					</Box>
				</Box>
			</Box>
		</S.Card>
	);
};

// Card.whyDidYouRender = true;

export default React.memo(Card);