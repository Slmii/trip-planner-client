import Button from '@components/buttons/button';

const MarkAsRead = ({ isPage, onMarkAllAsRead }: { isPage: boolean; onMarkAllAsRead: () => void }) => {
	return (
		<Button colorScheme='secondary' size={isPage ? 'md' : 'sm'} variant='ghost' onClick={onMarkAllAsRead}>
			Mark all as read
		</Button>
	);
};

export default MarkAsRead;
