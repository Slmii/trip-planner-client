export interface PopoverProps {
	trigger: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => JSX.Element;
	header?: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => JSX.Element;
	body: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => JSX.Element;
	footer?: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => JSX.Element;
	width?: string;
	placement?:
		| 'top'
		| 'right'
		| 'bottom'
		| 'left'
		| 'auto'
		| 'auto-start'
		| 'auto-end'
		| 'top-start'
		| 'top-end'
		| 'bottom-start'
		| 'bottom-end'
		| 'right-start'
		| 'right-end'
		| 'left-start'
		| 'left-end';
}
