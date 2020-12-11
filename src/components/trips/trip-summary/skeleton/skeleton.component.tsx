const Box = require('@material-ui/core/Box').default;
const Typography = require('@material-ui/core/Typography').default;
const MuiSkeleton = require('@material-ui/lab/Skeleton').default;

const Skeleton = () => {
	return (
		<Box padding='20px 30px 0 30px'>
			{/* <MuiSkeleton variant='text' />
			<MuiSkeleton variant='circle' width={40} height={40} />
			<MuiSkeleton variant='rect' width={210} height={118} /> */}
			<Typography variant='h3'>
				<MuiSkeleton animation='wave' />
			</Typography>
			<MuiSkeleton animation='wave' variant='text' width={100} />
			<MuiSkeleton animation='wave' variant='text' width={100} />
			<Typography variant='h1'>
				<MuiSkeleton animation='wave' />
			</Typography>
			<Box mb={2}>
				<Typography variant='h4'>
					<MuiSkeleton animation='wave' width={200} />
				</Typography>
				<MuiSkeleton variant='rect' height={150} />
			</Box>
			<Box>
				<Typography variant='h4'>
					<MuiSkeleton animation='wave' width={200} />
				</Typography>
				<Box mb={0.5}>
					<MuiSkeleton animation='wave' variant='text' />
				</Box>
				<MuiSkeleton variant='rect' height={150} />
			</Box>
		</Box>
	);
};

export default Skeleton;
