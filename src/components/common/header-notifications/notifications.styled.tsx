import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

import theme, { Theme } from '@theme/index';

export const notificationStyles = makeStyles((theme: Theme) =>
	createStyles({
		lineHeight: {
			lineHeight: 0.8
		},
		borderBottomNone: {
			'&:last-of-type > div': {
				borderBottom: 'none'
			}
		}
	})
);

export const Notification = styled.div<{ read: boolean; isPage: boolean }>`
	display: flex;
	align-items: center;
	padding: 15px;
	border-bottom: ${({ isPage }) => (isPage ? 'none' : `1px solid ${theme.palette.borderColor}`)};
	width: 100%;
	padding: 16px;
	/* border-left: 5px solid ${({ read }) => (read ? 'transparent' : theme.palette.secondary.main)}; */
	background-color: ${({ read }) => (!read ? 'rgba(74,137,139, .15)' : 'white')};
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
	background-color: ${theme.palette.primary.main};
	color: ${theme.palette.primary.contrastText};
	width: 100%;
	font-family: ${theme.typography.fontFamily};
	font-size: ${theme.typography.fontSize}px;
`;

export const NotificationTitle = styled(Typography)`
	text-align: left;
	line-height: 1;
	font-weight: ${theme.typography.fontWeightBold};
`;

export const NotificationSubTitle = styled.span`
	color: ${theme.palette.text.primary};
	font-weight: ${theme.typography.fontWeightMedium};
`;
