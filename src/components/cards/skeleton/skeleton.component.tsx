import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import MuiSkeleton from '@material-ui/lab/Skeleton';

import { Styled } from '@components/cards/card';

const Skeleton = ({ number = 10 }: { number?: number }) => {
	return (
		<>
			{Array.from(new Array(number)).map((_item, idx) => (
				<Box key={idx} display='flex'>
					<Styled.Card>
						<MuiSkeleton animation='wave' variant='rect'>
							<Styled.CardHeader />
						</MuiSkeleton>
						<Box padding='20px 30px' display='flex' flexDirection='column' width='100%'>
							<Typography variant='h5'>
								<MuiSkeleton animation='wave' />
							</Typography>
							<Typography variant='subtitle1'>
								<MuiSkeleton animation='wave' width='30%' />
							</Typography>
							<Typography variant='subtitle1'>
								<MuiSkeleton animation='wave' width='30%' />
							</Typography>
							<Box mb={1} mt={1}>
								<Typography variant='body2'>
									<MuiSkeleton animation='wave' />
								</Typography>
								<Typography variant='body2'>
									<MuiSkeleton animation='wave' />
								</Typography>
								<Typography variant='body2'>
									<MuiSkeleton animation='wave' />
								</Typography>
							</Box>
							<Box display='flex' justifyContent='space-between'>
								<Box display='flex'>
									<MuiSkeleton style={{ marginRight: 8 }} animation='wave' variant='rect' width={100} height={50} />
									<MuiSkeleton animation='wave' variant='rect' width={100} height={50} />
								</Box>
								<MuiSkeleton animation='wave' variant='rect' width={300} height={50} />
							</Box>
						</Box>
					</Styled.Card>
				</Box>
			))}
		</>
	);
};

export default Skeleton;
