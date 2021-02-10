import borders from './borders';
import colors from './colors';
import radii from './radius';
import shadows from './shadows';
import sizes from './sizes';
import spacing from './spacing';
import typography from './typography';

const foundations = {
	colors,
	borders,
	radii,
	shadows,
	sizes,
	space: spacing,
	...typography
};

export type Foundations = typeof foundations;
export default foundations;
