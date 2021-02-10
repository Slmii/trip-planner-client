import { Box, Heading, Text } from '@chakra-ui/react';

import { AccountTitleProps } from '@components/account/account-title';

const AccountTitle = ({ heading, suffix, subHeading }: AccountTitleProps) => {
	return (
		<Box>
			<Heading as='h1' size='lg'>
				{heading}
			</Heading>
			{suffix && (
				<Text mb={subHeading ? 2 : undefined} textStyle='overline'>
					{suffix}
				</Text>
			)}
			{subHeading && (
				<Heading as='h2' size='md'>
					{subHeading}
				</Heading>
			)}
		</Box>
	);
};

export default AccountTitle;
