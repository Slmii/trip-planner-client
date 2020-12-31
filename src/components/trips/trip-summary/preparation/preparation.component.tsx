import React from 'react';
import cn from 'classnames';
const Typography = require('@material-ui/core/Typography').default;
const ListItem = require('@material-ui/core/ListItem').default;
const ListItemIcon = require('@material-ui/core/ListItemIcon').default;
const ListItemText = require('@material-ui/core/ListItemText').default;
const ListItemSecondaryAction = require('@material-ui/core/ListItemSecondaryAction').default;
const Checkbox = require('@material-ui/core/Checkbox').default;
const DeleteIcon = require('@material-ui/icons/Delete').default;

import { IconButton } from '@components/button';
import { PreparationProps } from '@lib/types';

import { activityStyles } from './preparation.styled';

const Preparation = ({ preparation, onDelete, onStatusChange }: PreparationProps) => {
	const { id, name, status, description } = preparation;
	const { preparationHeading, preparationComplete } = activityStyles();

	const labelId = `checkbox-list-label-${preparation.id}`;

	return (
		<ListItem role={undefined} dense button onClick={() => onStatusChange(id)}>
			<ListItemIcon>
				<Checkbox edge='start' checked={status} tabIndex={-1} disableRipple inputProps={{ 'aria-labelledby': labelId }} />
			</ListItemIcon>
			<ListItemText
				disableTypography={true}
				id={labelId}
				className={cn({
					[preparationComplete]: status
				})}
				primary={<Typography className={preparationHeading}>{name}</Typography>}
				secondary={
					description ? (
						<Typography variant='subtitle1' color='textSecondary'>
							{description}
						</Typography>
					) : null
				}
			/>
			<ListItemSecondaryAction>
				<IconButton
					aria-label='delete preparation'
					color='error'
					tooltip={true}
					icon={<DeleteIcon fontSize='small' />}
					title='Delete'
					onClick={() => onDelete(id)}
				/>
			</ListItemSecondaryAction>
		</ListItem>
	);
};

export default React.memo(Preparation);
