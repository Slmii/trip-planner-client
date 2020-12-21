/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
const MuiBreadcrumbs = require('@material-ui/core/Breadcrumbs').default;
const Box = require('@material-ui/core/Box').default;
const NavigateNextIcon = require('@material-ui/icons/NavigateNext').default;
const HomeIcon = require('@material-ui/icons/Home').default;

import { breadcrumbsStyles } from './breadcrumbs.styled';

const convertBreadcrumb = (string: string) => {
	const [convertedBreadcrumb] = string
		.replace(/-/g, ' ')
		.replace(/oe/g, 'ö')
		.replace(/ae/g, 'ä')
		.replace(/ue/g, 'ü')
		.toLowerCase()
		.split('?');

	return convertedBreadcrumb.charAt(0).toUpperCase() + convertedBreadcrumb.slice(1);
};

const Breadcrumbs = () => {
	const router = useRouter();
	const [breadcrumbs, setBreadcrumbs] = useState<{ breadcrumb: string; href: string }[]>([]);

	const { inactive, hoverOnBreadcrumb, separator } = breadcrumbsStyles();

	useEffect(() => {
		if (router) {
			const linkPath = router.asPath.split('/');
			linkPath.shift();

			const pathArray = linkPath.map((path, i) => {
				return { breadcrumb: path, href: '/' + linkPath.slice(0, i + 1).join('/') };
			});

			setBreadcrumbs(pathArray);
		}
	}, [router]);

	if (!breadcrumbs) {
		return null;
	}

	return (
		<MuiBreadcrumbs separator={<NavigateNextIcon fontSize='small' className={`${separator} ${inactive}`} />} aria-label='breadcrumbs'>
			<Link href='/'>
				<a title='Home'>
					<Box display='flex' alignItems='center'>
						<HomeIcon fontSize='small' color='secondary' />
					</Box>
				</a>
			</Link>
			{breadcrumbs.map(({ breadcrumb, href }, i) => (
				<Link key={i} href={href}>
					<a className={`${hoverOnBreadcrumb} ${i + 1 === breadcrumbs.length ? '' : inactive}`}>
						{convertBreadcrumb(breadcrumb)}
					</a>
				</Link>
			))}
		</MuiBreadcrumbs>
	);
};

export default Breadcrumbs;
