const MuiPopover = require('@material-ui/core/Popover').default;

import { IPopoverProps } from '@components/popover';

const Popover = ({ type, anchorEl, onClose, children }: IPopoverProps) => {
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

Popover.whyDidYouRender = true;

export default Popover;
