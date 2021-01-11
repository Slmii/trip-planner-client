import { TransitionProps } from '@material-ui/core/transitions';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@components/buttons/button';
import { Styled } from '@components/snackbar';
import { selectSnackbar, setSnackbar } from '@lib/redux/snackbar';

const IconButton = require('@material-ui/core/IconButton').default;
const Slide = require('@material-ui/core/Slide').default;
const Alert = require('@material-ui/lab/Alert').default;
const Close = require('@material-ui/icons/Close').default;

function SlideTransition(props: TransitionProps) {
	return <Slide {...props} direction='left' />;
}

const Snackbar = () => {
	const dispatch = useDispatch();

	const snackbar = useSelector(selectSnackbar);
	const { open, message, severity, onUndo } = snackbar;

	const { undoErrorColor } = Styled.snackbarStyles();

	const handleOnCloseSnackbar = (
		_event?: React.SyntheticEvent | React.MouseEvent,
		reason?: string,
		undo?: boolean
	) => {
		if (reason === 'clickaway') {
			return;
		}

		if (undo && onUndo) {
			onUndo();
		}

		dispatch(
			setSnackbar({
				...snackbar,
				open: false
			})
		);
	};

	return (
		<Styled.Snackbar
			open={open}
			autoHideDuration={6000}
			onClose={(e: React.SyntheticEvent | React.MouseEvent, reason: string) =>
				handleOnCloseSnackbar(e, reason, false)
			}
			TransitionComponent={SlideTransition}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
		>
			<Alert
				severity={severity}
				action={
					<Fragment>
						{severity === 'error' && onUndo ? (
							<Button
								aria-label='undo'
								color='default'
								size='small'
								variant='text'
								className={undoErrorColor}
								onClick={() => handleOnCloseSnackbar(undefined, undefined, true)}
							>
								UNDO
							</Button>
						) : null}
						<IconButton
							size='small'
							aria-label='close'
							color='inherit'
							onClick={() => handleOnCloseSnackbar(undefined, undefined, false)}
						>
							<Close fontSize='small' />
						</IconButton>
					</Fragment>
				}
			>
				{message}
			</Alert>
		</Styled.Snackbar>
	);
};

export default Snackbar;
