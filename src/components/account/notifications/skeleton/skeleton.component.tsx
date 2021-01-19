import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import MuiSkeleton from '@material-ui/lab/Skeleton';

import theme from '@theme/index';

const Skeleton = ({ number = 10 }: { number?: number }) => {
	return (
		<Paper elevation={2}>
			<Box display='flex' flexDirection='column' border={`1px solid ${theme.palette.borderColor}`}>
				{Array.from(new Array(number)).map((_item, idx) => (
					<Box
						key={idx}
						borderBottom={`1px solid ${theme.palette.borderColor}`}
						height={98}
						width='100%'
						display='flex'
						alignItems='center'
						p={1}
					>
						<Box display='flex' alignItems='center' mr={1}>
							<MuiSkeleton variant='circle' height={8} width={8} />
						</Box>
						<Box mr={1}>
							<MuiSkeleton variant='circle' height={66} width={66} />
						</Box>
						<Box width='100%'>
							<MuiSkeleton variant='text' animation='wave' />
							<MuiSkeleton variant='text' animation='wave' />
						</Box>
					</Box>
				))}
			</Box>
		</Paper>
	);
};

export default Skeleton;
