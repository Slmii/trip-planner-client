import { useDispatch, useSelector } from 'react-redux';
import { forwardRef } from 'react';
import { TransitionProps } from '@material-ui/core/transitions';
const Box = require('@material-ui/core/Box').default;
const MuiButton = require('@material-ui/core/Button').default;
const MuiDialog = require('@material-ui/core/Dialog').default;
const Slide = require('@material-ui/core/Slide').default;
const DialogActions = require('@material-ui/core/DialogActions').default;
const DialogContent = require('@material-ui/core/DialogContent').default;
const DialogContentText = require('@material-ui/core/DialogContentText').default;
const DialogTitle = require('@material-ui/core/DialogTitle').default;
const { useTheme, withStyles, createStyles } = require('@material-ui/core');

import { Button } from '@components/button';
import { selectDialog, setDialog } from '@lib/redux/dialog';
import { Theme } from '@theme/index';

export const ErrorButtonContained = withStyles((theme: Theme) =>
	createStyles({
		root: {
			background: theme.palette.error.main,
			color: theme.palette.error.contrastText,
			border: 0,
			padding: '6px 16px',
			boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
			'&:hover': {
				background: theme.palette.error.dark
			}
		}
	})
)(MuiButton);

export const Transition = forwardRef(function Transition(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	props: TransitionProps & { children?: React.ReactElement<any, any> },
	ref: React.Ref<unknown>
) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export default function Dialog() {
	const dispatch = useDispatch();
	const dialog = useSelector(selectDialog);
	const { open, severity, description, title, fullWidth, maxWidth, onCancel, onConfirm } = dialog;
	const theme: Theme = useTheme();

	const handleOnClose = () => {
		if (onCancel) {
			onCancel();
		}

		closeDialog();
	};

	const handleOnConfirm = () => {
		if (onConfirm) {
			onConfirm();
		}

		closeDialog();
	};

	const closeDialog = () => {
		dispatch(
			setDialog({
				...dialog,
				open: false
			})
		);
	};

	return (
		<MuiDialog
			open={open}
			onClose={handleOnClose}
			aria-labelledby='dialog-title'
			aria-describedby='dialog-description'
			fullWidth={fullWidth}
			maxWidth={maxWidth}
			TransitionComponent={Transition}
		>
			<Box bgcolor={theme.palette[severity].main} height='5px' />
			<DialogTitle id='dialog-title'>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id='dialog-description'>{description}</DialogContentText>
			</DialogContent>
			<Box padding='8px 16px 8px 16px'>
				<DialogActions>
					<Button onClick={handleOnClose} variant='outlined' color='default' fullWidth={false}>
						Cancel
					</Button>
					{severity === 'error' ? (
						<ErrorButtonContained onClick={handleOnConfirm} fullWidth={false}>
							Confirm
						</ErrorButtonContained>
					) : (
						<Button onClick={handleOnConfirm} variant='contained' fullWidth={false}>
							Confirm
						</Button>
					)}
				</DialogActions>
			</Box>
		</MuiDialog>
	);
}
