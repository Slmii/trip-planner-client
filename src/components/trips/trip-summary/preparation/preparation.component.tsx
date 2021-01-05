import React, { useState } from 'react';
import cn from 'classnames';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
const Box = require('@material-ui/core/Box').default;
const Typography = require('@material-ui/core/Typography').default;
const List = require('@material-ui/core/List').default;
const ListItem = require('@material-ui/core/ListItem').default;
const ListItemIcon = require('@material-ui/core/ListItemIcon').default;
const ListItemText = require('@material-ui/core/ListItemText').default;
const ListItemSecondaryAction = require('@material-ui/core/ListItemSecondaryAction').default;
const DeleteIcon = require('@material-ui/icons/Delete').default;

import IconButton from '@components/buttons/icon-button';
import { PreparationProps, Styled } from '@components/trips/trip-summary/preparation';

const Preparation = ({ preparation, onDelete, onStatusChange, isLast }: PreparationProps) => {
	const [open, setOpen] = useState(false);

	const { id, name, description, subPreparations } = preparation;
	const { preparationHeading, preparationComplete, subPreparationHeading, nested, listItemIcon } = Styled.activityStyles();

	const labelId = `checkbox-list-label-${id}`;

	const handleOnOpen = () => {
		setOpen(!open);
	};

	return (
		<>
			<ListItem role={undefined} dense button onClick={handleOnOpen}>
				<ListItemText
					disableTypography={true}
					id={labelId}
					className={cn({
						[preparationComplete]: subPreparations.every(({ status }) => status)
					})}
					primary={
						<Box display='flex' alignItems='flex-end'>
							<Typography className={preparationHeading}>{name}</Typography>
							<Typography variant='subtitle2' color='textSecondary'>
								{subPreparations.filter(({ status }) => status).length}/{subPreparations.length} complete
							</Typography>
						</Box>
					}
					secondary={
						description ? (
							<Typography variant='subtitle1' color='textSecondary'>
								{description}
							</Typography>
						) : null
					}
				/>
				{}
				<ListItemSecondaryAction>
					<IconButton
						title=''
						icon={open ? <ExpandLess color='action' /> : <ExpandMore color='action' />}
						onClick={handleOnOpen}
					/>
				</ListItemSecondaryAction>
			</ListItem>
			{subPreparations.length ? (
				<Collapse in={open} timeout='auto' unmountOnExit>
					<List component='div' disablePadding>
						{subPreparations.map(subPreparation => {
							const labelId = `checkbox-sub-list-label-${subPreparation.id}`;

							return (
								<ListItem
									key={subPreparation.id}
									button
									onClick={() => onStatusChange(subPreparation.id)}
									className={nested}
								>
									<ListItemIcon className={listItemIcon}>
										<Checkbox
											edge='start'
											color='primary'
											size='small'
											checked={subPreparation.status}
											tabIndex={-1}
											disableRipple
											inputProps={{ 'aria-labelledby': labelId }}
										/>
									</ListItemIcon>
									<ListItemText
										disableTypography={true}
										id={labelId}
										className={cn({
											[preparationComplete]: subPreparation.status
										})}
										primary={<Typography className={subPreparationHeading}>{subPreparation.name}</Typography>}
									/>
									<ListItemSecondaryAction>
										<IconButton
											aria-label='delete sub preparation'
											color='error'
											tooltip={true}
											icon={<DeleteIcon fontSize='small' />}
											title='Delete'
											onClick={() => onDelete(subPreparation.id)}
										/>
									</ListItemSecondaryAction>
								</ListItem>
							);
						})}
					</List>
				</Collapse>
			) : null}
			{!isLast && <Divider />}
		</>
	);
};

export default React.memo(Preparation);
