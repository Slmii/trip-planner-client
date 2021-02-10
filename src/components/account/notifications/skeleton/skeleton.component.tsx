import { Box, Flex, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react';

import Paper from '@components/paper';

import theme from '@theme/index';
import spacing from '@theme/spacing';

const Skeleton = ({ number = 10 }: { number?: number }) => {
	return (
		<Paper>
			<Stack>
				{Array.from(new Array(number)).map((_item, idx) => (
					<Flex
						key={idx}
						borderBottom={`1px solid ${theme.colors.border}`}
						height={104}
						width='100%'
						alignItems='center'
						p={spacing.INNER_PADDING}
					>
						<Flex alignItems='center' mr={4}>
							<SkeletonCircle size='2' />
						</Flex>
						<Box mr={4}>
							<SkeletonCircle size='16' />
						</Box>
						<Box width='100%'>
							<SkeletonText noOfLines={2} spacing='2' />
						</Box>
					</Flex>
				))}
			</Stack>
		</Paper>
	);
};

export default Skeleton;
