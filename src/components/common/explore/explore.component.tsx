import { Box, Container, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MdBeachAccess, MdCardTravel } from 'react-icons/md';

import ExploreItem from '@components/common/explore/explore-item';
import Icon from '@components/icon';
import { url } from '@lib/utils';

const Explore = () => {
	const router = useRouter();

	const handleOnExploreItemNavigation = (name: string) => {
		router.push(`/explore/${name}`);
	};

	const isExplorePage = url.isPage('explore', router);
	const isTripsPage = url.isSubPage('trips', router);
	const isActivitiesPage = url.isSubPage('activities', router);

	return (
		<Box bgColor='primary.600'>
			<Container maxW='container.xl'>
				<Flex mx={6} color='white' alignItems='center'>
					<ExploreItem
						name='trips'
						onNavigation={handleOnExploreItemNavigation}
						isPage={isExplorePage && isTripsPage}
						icon={<Icon as={MdCardTravel} />}
					/>
					<ExploreItem
						name='activities'
						onNavigation={handleOnExploreItemNavigation}
						isPage={isExplorePage && isActivitiesPage}
						icon={<Icon as={MdBeachAccess} />}
					/>
				</Flex>
			</Container>
		</Box>
	);
};

export default Explore;
