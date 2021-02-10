import { ColorKeys, Severity } from '@lib/types';

const SEVERITY_COLOR: Record<Severity, ColorKeys> = {
	error: 'red',
	info: 'blue',
	success: 'primary',
	warning: 'orange'
};

export default {
	SEVERITY_COLOR
};
