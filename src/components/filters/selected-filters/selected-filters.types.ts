import { ActivityTypeFragment, TransportationTypeFragment } from '@generated/graphql';

import { FiltersState } from '@components/filters';
import { KeyOf } from '@lib/types';

export interface SelectedFiltersProps {
	filters: FiltersState;
	onDelete: (key: KeyOf<FiltersState>) => void;
	activityTypes?: ActivityTypeFragment[];
	transportationTypes?: TransportationTypeFragment[];
}
