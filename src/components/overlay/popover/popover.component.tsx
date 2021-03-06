import {
    Box,
    Popover as CIUPopover,
    PopoverBody,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Portal
} from '@chakra-ui/react';

import { PopoverProps } from '@components/overlay/popover';

const Popover = ({ trigger, header, body, footer, width, placement = 'bottom' }: PopoverProps) => {
	return (
		<CIUPopover placement={placement} width={width}>
			{({ isOpen, onClose }) => (
				<>
					<PopoverTrigger>
						<Box>{trigger({ isOpen, onClose })}</Box>
					</PopoverTrigger>
					<Portal>
						<PopoverContent>
							{/* <PopoverArrow /> */}
							{header && <PopoverHeader p={0}>{header({ isOpen, onClose })}</PopoverHeader>}
							<PopoverBody p={0}>{body({ isOpen, onClose })}</PopoverBody>
							{footer && <PopoverFooter p={0}>{footer({ isOpen, onClose })}</PopoverFooter>}
						</PopoverContent>
					</Portal>
				</>
			)}
		</CIUPopover>
	);
};

export default Popover;
