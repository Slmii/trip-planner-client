const MuiPopover = require('@material-ui/core/Popover').default;

import { PopoverProps } from '@components/popover';

const Popover = ({ type, anchorEl, onClose, children }: PopoverProps) => {
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
				horizontal: 'left'
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'left'
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
