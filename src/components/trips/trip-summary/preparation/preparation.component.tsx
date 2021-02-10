import {
    Box,
    Checkbox,
    Collapse,
    Divider,
    Flex,
    HStack,
    ListIcon,
    ListItem,
    Text,
    useDisclosure,
    VStack
} from '@chakra-ui/react';
import React from 'react';
import { MdDelete, MdExpandLess, MdExpandMore } from 'react-icons/md';

import IconButton from '@components/buttons/icon-button';
import Icon from '@components/icon';
import { PreparationProps } from '@components/trips/trip-summary/preparation';

import spacing from '@theme/spacing';

const Preparation = ({ preparation, onDelete, onStatusChange, isLast }: PreparationProps) => {
	const { isOpen, onToggle } = useDisclosure();

	const { name, description, subPreparations } = preparation;

	return (
		<>
			<ListItem
				display='flex'
				alignItems='center'
				cursor='pointer'
				_hover={{
					bg: 'gray.100'
				}}
				onClick={onToggle}
				p={3}
			>
				<VStack align='stretch' w='100%'>
					<Flex>
						<HStack flex='1' spacing={spacing.BODY_SPACING_SMALL}>
							<Text textStyle='notification-title-name' lineHeight='none'>
								{name}
							</Text>
							<Text textStyle='overline' lineHeight='none'>
								({subPreparations.filter(({ status }) => status).length}/{subPreparations.length}{' '}
								complete)
							</Text>
						</HStack>
						<ListIcon as={isOpen ? MdExpandLess : MdExpandMore} />
					</Flex>
					{description && (
						<Text textStyle='subtitle' textAlign='left' lineHeight='none'>
							{description}
						</Text>
					)}
				</VStack>
			</ListItem>
			<Collapse in={isOpen} animateOpacity>
				<VStack align='stretch'>
					{subPreparations.map(subPrep => (
						<Flex
							key={subPrep.id}
							justifyContent='space-between'
							_hover={{
								bg: 'gray.100'
							}}
							pl={8}
						>
							<Checkbox
								colorScheme='secondary'
								isChecked={subPrep.status}
								onChange={() => onStatusChange(subPrep.id)}
								flex='1'
								py={3}
							>
								{subPrep.name}
							</Checkbox>
							<Box pr={2} pt={1}>
								<IconButton
									colorScheme='red'
									tooltip={true}
									icon={<Icon as={MdDelete} size='md' />}
									size='md'
									title='Delete'
									onClick={() => onDelete(subPrep.id)}
								/>
							</Box>
						</Flex>
					))}
				</VStack>
			</Collapse>
			{!isLast && <Divider />}
		</>
	);
};

export default React.memo(Preparation);
