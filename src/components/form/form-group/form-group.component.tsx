const Box = require('@material-ui/core/Box').default;

export default function FormGroup({ children }: { children: React.ReactElement }) {
	return (
		<Box position='relative' width='100%' mb={1}>
			{children}
		</Box>
	);
}
