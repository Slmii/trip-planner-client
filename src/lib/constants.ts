export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
export const IS_SERVER = typeof window === 'undefined';

export const STRENGTH = {
	1: 'Very weak',
	2: 'Weak',
	3: 'So-so',
	4: 'Good',
	5: 'Strong'
};
