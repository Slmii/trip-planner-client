const Box = require('@material-ui/core/Box').default;
const Typography = require('@material-ui/core/Typography').default;
const MuiSkeleton = require('@material-ui/lab/Skeleton').default;

import * as S from '@components/card/card/card.styled';

const Skeleton = ({ number = 10 }: { number?: number }) => {
	return (
		<>
			{Array.from(new Array(number)).map((_item, idx) => (
				<Box key={idx} display='flex'>
					<S.Card>
						<MuiSkeleton animation='wave' variant='rect'>
							<S.CardHeader />
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
								<Box dispay='flex'>
									<MuiSkeleton animation='wave' variant='rect' width={300} height={50} />
								</Box>
							</Box>
						</Box>
					</S.Card>
				</Box>
			))}
		</>
	);
};

export default Skeleton;
