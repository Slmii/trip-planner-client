import { Badge, keyframes, usePrefersReducedMotion } from '@chakra-ui/react';

const ripple = keyframes`
		0% {
			box-shadow: 0 0 0 4px rgba(80, 148, 150, 0.2);
		}
		100% {
			box-shadow: 0 0 0 10px rgba(80, 148, 150, 0);
		}
	`;

export const UnReadNotificationBadge = () => {
	const prefersReducedMotion = usePrefersReducedMotion();

	const animation = prefersReducedMotion ? undefined : `${ripple} 1s infinite ease-in-out`;

	return (
		<Badge
			animation={animation}
			w='8px'
			h='8px'
			boxShadow='base'
			position='relative'
			_after={{
				position: 'absolute',
				top: 0,
				left: 0,
				bottom: 0,
				width: '100%',
				height: '100%',
				borderRadius: '50%',
				animation: 'inherit',
				content: '""'
			}}
			variant='solid'
			colorScheme='primary'
			borderRadius='base'
		/>
	);
};

export const ReadNotificationBadge = () => {
	return <Badge w='8px' h='8px' variant='solid' borderRadius='base' />;
};
