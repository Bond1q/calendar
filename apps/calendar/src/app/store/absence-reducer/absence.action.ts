import { createAction, props } from '@ngrx/store';
import { AbsencePeriod } from '../../types/types';

export const deleteAbsence = createAction(
	'[Absence] delete',
	props<{ id: string }>()
);

export const updateAbsence = createAction(
	'[Absence] update',
	props<{ id: string; dateStart: Date; dateEnd: Date }>()
);

export const createAbsence = createAction(
	'[Absence] create',
	props<{ absence: Omit<AbsencePeriod, 'id'> }>()
);
