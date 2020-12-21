import { filters } from '@lib/redux';

export interface AnchorElementState {
	filters: null | HTMLElement;
	activityType: null | HTMLElement;
	transportationType: null | HTMLElement;
	sort: null | HTMLElement;
}

export interface ArrayValues {
	value: filters.SortBy | filters.OrderBy;
	label: string;
}

export type ChipsPrefixMapping = filters.Extended & { sort: string; order: string };
