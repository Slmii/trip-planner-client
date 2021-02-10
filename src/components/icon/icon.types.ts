import { IconType } from 'react-icons/lib';

import { ColorKeys, Size } from '@lib/types';

export interface IconProps {
	as: IconType;
	color?: ColorKeys;
	size?: Size | 'xl';
	mr?: boolean;
	ml?: boolean;
}
