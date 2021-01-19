import ButtonBase from '@material-ui/core/ButtonBase';

import { Styled } from '@components/account/notifications/mark-as-read';
import Button from '@components/buttons/button';

const MarkAsRead = ({ isPage, onMarkAllAsRead }: { isPage: boolean; onMarkAllAsRead: () => void }) => {
	return (
		<>
			{isPage ? (
				<Button color='secondary' fullWidth={false} onClick={onMarkAllAsRead}>
					Mark all as read
				</Button>
			) : (
				<ButtonBase onClick={onMarkAllAsRead}>
					<Styled.MarkAllAsRead variant='caption' color='secondary'>
						Mark all as read
					</Styled.MarkAllAsRead>
				</ButtonBase>
			)}
		</>
	);
};

export default MarkAsRead;
