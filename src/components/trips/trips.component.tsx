import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import AccountTitle from '@components/account/account-title';
import Button from '@components/buttons/button';
import Cards from '@components/cards/cards';
import Skeleton from '@components/cards/skeleton';
import ExtendedFilters from '@components/filters/extended-filters';
import Pagination from '@components/pagination';
import { TripsWrapperProps } from '@components/trips';
import { selectRows } from '@lib/redux/filters/filters.selectors';

import spacing from '@theme/spacing';

const TripsWrapper = ({ heading, suffix, isLoading, trips, totalCount, hasFilters = true }: TripsWrapperProps) => {
	const rows = useSelector(selectRows);
	const router = useRouter();

	return (
		<>
			<AccountTitle heading={heading} suffix={suffix} />
			{hasFilters && <ExtendedFilters />}
			{isLoading ? (
				<Skeleton />
			) : trips.length ? (
				<>
					<Cards trips={trips} />
					<Pagination count={Math.ceil(totalCount / Number(rows))} />
				</>
			) : (
				<Flex justifyContent='center'>
					<VStack spacing={spacing.BODY_SPACING_LARGE} mt={10} align='center'>
						<Box>
							<Image src='/assets/illustrations/not_found.svg' alt='Not found' width={500} height={250} />
						</Box>
						<Flex flexDir='column' alignItems='center'>
							<Heading as='h2' textStyle='title'>
								Nothing to see here
							</Heading>
							<Text textStyle='body'>Start by exploring the community</Text>
						</Flex>
						<Button colorScheme='secondary' onClick={() => router.push('/explore')}>
							Explore community
						</Button>
					</VStack>
				</Flex>
			)}
		</>
	);
};

export default TripsWrapper;
