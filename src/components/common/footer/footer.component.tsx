import { Box, Container, Flex } from '@chakra-ui/react';

export default function Footer() {
	return (
		<Box as='footer' w='100%' h='300px' fontSize='sm' mt={50} bgColor='text' color='white'>
			<Container maxW='container.xl' h='100%'>
				<Flex alignItems='center' m='0 auto' h='100%'>
					Footer
				</Flex>
			</Container>
		</Box>
	);
}
