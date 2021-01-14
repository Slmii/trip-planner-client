import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core/SvgIcon';

export interface DashboardMenuItem {
	key: string;
	title: string;
	description: string;
	// eslint-disable-next-line @typescript-eslint/ban-types
	Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
}
