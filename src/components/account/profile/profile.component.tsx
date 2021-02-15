import { Box, HStack, Img, VStack } from '@chakra-ui/react';
import React from 'react';

import AccountTitle from '@components/account/account-title';
import { useMeQuery } from '@generated/graphql';

import spacing from '@theme/spacing';

const Profile = () => {
	const { data } = useMeQuery();

	return (
		<>
			<AccountTitle heading='My profile' />
			<HStack spacing={spacing.BODY_SPACING_LARGE} alignContent='flex-start'>
				<Img
					borderRadius='full'
					boxSize='250px'
					objectFit='cover'
					src={data?.me?.profileImgUrl ?? ''}
					alt={data?.me?.name ?? ''}
				/>
				<VStack align='stretch'>
					<Box>dadad</Box>
				</VStack>
			</HStack>
		</>
	);
};

export default Profile;
