import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import BeachAccessOutlinedIcon from '@material-ui/icons/BeachAccessOutlined';
import CardTravelOutlinedIcon from '@material-ui/icons/CardTravelOutlined';
import cn from 'classnames';
import { useRouter } from 'next/router';

import { Styled } from '@components/common/explore';
import { helpers } from '@lib/utils';

import { globalStyles } from '@styles/global-styled';
import theme from '@theme/index';

const Explore = () => {
	const router = useRouter();

	const { iconMr } = globalStyles();
	const { active } = Styled.layoutStyles();

	const [path, subPath] = helpers.getCurrentRoute(router);
	const fullPath = `${path}/${subPath}`;

	return (
		<Box bgcolor={theme.palette.primary.dark}>
			<Container fixed disableGutters={true}>
				<Box display='flex' margin='0 24px' color='white' alignItems='center'>
					<Styled.ExploreItem
						onClick={() => router.push('/explore/trips')}
						className={cn({
							[active]: fullPath === 'explore/trips'
						})}
					>
						<CardTravelOutlinedIcon fontSize='small' className={iconMr} />
						Explore trips
					</Styled.ExploreItem>
					<Styled.ExploreItem
						onClick={() => router.push('/explore/activities')}
						className={cn({
							[active]: fullPath === 'explore/activities'
						})}
					>
						<BeachAccessOutlinedIcon fontSize='small' className={iconMr} />
						Explore activities
					</Styled.ExploreItem>
				</Box>
			</Container>
		</Box>
	);
};

export default Explore;
