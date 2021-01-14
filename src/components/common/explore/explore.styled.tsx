import ButtonBase from '@material-ui/core/ButtonBase';
import { createStyles, makeStyles, styled, Theme } from '@material-ui/core/styles';

export const ExploreItem = styled(ButtonBase)(({ theme }) => ({
	display: 'flex',
	padding: '10px',
	alignItems: 'center',
	borderBottom: '3px solid transparent',
	fontFamily: theme.typography.fontFamily,
	fontSize: theme.typography.fontSize,
	'&:hover': {
		color: theme.palette.secondary.main
	}
}));

export const layoutStyles = makeStyles((theme: Theme) =>
	createStyles({
		active: {
			borderBottomColor: theme.palette.secondary.main,
			color: theme.palette.secondary.main
		}
	})
);
