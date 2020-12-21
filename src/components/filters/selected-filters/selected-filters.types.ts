import { ActivityTypeFragment, TransportationTypeFragment } from '@generated/graphql';

import { FiltersState } from '@components/filters';

export interface SelectedFiltersProps {
	filters: FiltersState;
	onDelete: (key: keyof FiltersState) => void;
	activityTypes?: ActivityTypeFragment[];
	transportationTypes?: TransportationTypeFragment[];
}
