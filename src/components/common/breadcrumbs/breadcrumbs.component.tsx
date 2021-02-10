import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Container } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { MdNavigateNext } from 'react-icons/md';

import Icon from '@components/icon';

const convertBreadcrumb = (string: string) => {
	const [convertedBreadcrumb] = string
		.replace(/-/g, ' ')
		.replace(/oe/g, 'ö')
		.replace(/ae/g, 'ä')
		.replace(/ue/g, 'ü')
		.toLowerCase()
		.split('?');

	const [breadcrumb] = convertedBreadcrumb.split('#');

	return breadcrumb.charAt(0).toUpperCase() + breadcrumb.slice(1);
};

const Breadcrumbs = () => {
	const router = useRouter();
	const [breadcrumbs, setBreadcrumbs] = useState<{ breadcrumb: string; href: string }[]>([]);

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
		<Container maxW='container.xl'>
			<Box p={6}>
				<Breadcrumb fontSize='md' spacing={1} separator={<Icon size='sm' as={MdNavigateNext} />}>
					<BreadcrumbItem layerStyle='disabled'>
						<BreadcrumbLink as={NextLink} href='/' passHref>
							<Box as='a'>Home</Box>
						</BreadcrumbLink>
					</BreadcrumbItem>
					{breadcrumbs.map(({ breadcrumb, href }, idx) => (
						<BreadcrumbItem key={idx} layerStyle={idx + 1 !== breadcrumbs.length ? 'disabled' : undefined}>
							<BreadcrumbLink as={NextLink} href={href} passHref>
								<Box as='a'>{convertBreadcrumb(breadcrumb)}</Box>
							</BreadcrumbLink>
						</BreadcrumbItem>
					))}
				</Breadcrumb>
			</Box>
		</Container>
	);
};

export default Breadcrumbs;
