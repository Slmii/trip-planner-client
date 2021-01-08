import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import theme, { Theme } from '@theme/index';

export const notificationStyles = makeStyles((theme: Theme) =>
	createStyles({
		lineHeight: {
			lineHeight: 0.8
		}
	})
);

export const Notification = styled.div<{ read: boolean }>`
	display: flex;
	align-items: center;
	padding: 15px;
	border-bottom: 1px solid ${theme.palette.borderColor};
	width: 100%;
	/* border-left: 5px solid ${({ read }) => (read ? 'transparent' : theme.palette.secondary.main)}; */
	background-color: ${({ read }) => (!read ? 'rgba(241,206,70, .15)' : 'white')};
	cursor: pointer;

	&:hover {
		background-color: ${theme.palette.action.hover};
	}
`;

export const SeeAllNotifications = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 7.5px 0;
	background-color: ${theme.palette.secondary.main};
	color: ${theme.palette.secondary.contrastText};
	width: 100%;
	font-family: ${theme.typography.fontFamily};
	font-size: ${theme.typography.fontSize}px;
`;

export const MarkAllAsRead = styled(Typography)`
	color: ${theme.palette.secondary.main};
	font-weight: ${theme.typography.caption.fontWeight};
	line-height: ${theme.typography.caption.lineHeight};
	font-family: ${theme.typography.caption.fontFamily};

	&:hover {
		color: ${theme.palette.secondary.dark};
	}
`;

export const NotificationTitle = styled(Typography)`
	text-align: left;
	line-height: 1;
`;

export const NotificationSubTitle = styled.span`
	color: ${theme.palette.text.primary};
	font-weight: ${theme.typography.fontWeightMedium};
`;
