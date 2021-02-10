import { Divider, Skeleton as CUISkeleton, SkeletonText, VStack } from '@chakra-ui/react';

import Paper from '@components/paper';

import spacing from '@theme/spacing';

const Skeleton = ({ number = 10 }: { number?: number }) => {
	return (
		<VStack spacing={spacing.CARD}>
			{Array.from(new Array(number)).map((_item, idx) => (
				<Paper
					key={idx}
					display='flex'
					width='100%'
					height='257px'
					_hover={{
						boxShadow: 'card'
					}}
				>
					<CUISkeleton w='360px' />
					<VStack spacing={spacing.BODY_SPACING} p={spacing.INNER_PADDING} align='flex-start' width='659px'>
						<SkeletonText noOfLines={5} spacing={5} w='100%' />
						<Divider />
						<CUISkeleton h='100%' w='100%' />
					</VStack>
				</Paper>
			))}
		</VStack>
	);
};

export default Skeleton;
