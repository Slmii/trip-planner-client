const MuiPopover = require('@material-ui/core/Popover').default;

import { PopoverProps } from '@components/popover';

const Popover = ({ type, anchorEl, onClose, children, position = 'left' }: PopoverProps) => {
	const handleOnClose = () => {
		onClose(type);
	};

	return (
		<MuiPopover
			id={anchorEl ? `${type}-popover` : undefined}
			open={Boolean(anchorEl)}
			anchorEl={anchorEl}
			onClose={handleOnClose}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: position
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: position
			}}
			style={{
				marginTop: 5
			}}
		>
			{children}
		</MuiPopover>
	);
};

export default Popover;
