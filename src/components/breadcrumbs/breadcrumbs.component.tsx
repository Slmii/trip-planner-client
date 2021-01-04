/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import MuiBreadcrumbs from '@material-ui/core/Breadcrumbs';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import HomeIcon from '@material-ui/icons/Home';
import cn from 'classnames';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { Styled } from '@components/breadcrumbs';

import theme from '@theme/index';

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

	const { inactive, hoverOnBreadcrumb, separator } = Styled.breadcrumbsStyles();

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
		<MuiBreadcrumbs separator={<NavigateNextIcon fontSize='small' className={cn(separator, inactive)} />} aria-label='breadcrumbs'>
			<Link href='/'>
				<a title='Home'>
					<Box display='flex' alignItems='center'>
						<HomeIcon fontSize='small' style={{ color: theme.palette.primary.dark }} />
					</Box>
				</a>
			</Link>
			{breadcrumbs.map(({ breadcrumb, href }, i) => (
				<Link key={i} href={href}>
					<a
						className={cn(hoverOnBreadcrumb, {
							[inactive]: i + 1 !== breadcrumbs.length
						})}
					>
						{convertBreadcrumb(breadcrumb)}
					</a>
				</Link>
			))}
		</MuiBreadcrumbs>
	);
};

export default Breadcrumbs;
