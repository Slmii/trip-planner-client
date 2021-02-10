import { extendTheme } from '@chakra-ui/react';

import components from '@theme/components';
import foundations from '@theme/foundations';
import styles from '@theme/global';
import layerStyles from '@theme/layer-styles';
import textStyles from '@theme/text-styles';

const theme = extendTheme({
	...foundations,
	components,
	styles,
	layerStyles,
	textStyles
});

export default theme;
