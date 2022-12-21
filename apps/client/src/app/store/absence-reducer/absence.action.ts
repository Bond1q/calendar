import { createAction, props } from '@ngrx/store';
import { Absence as AbsencePeriod } from 'shared/types';

export const deleteAbsence = createAction('[Absence] delete', props<{ id: string }>());

export const updateAbsence = createAction(
	'[Absence] update',
	props<{ id: string; dateStart: Date; dateEnd: Date }>(),
);

export const createAbsence = createAction(
	'[Absence] create',
	props<{ absence: Omit<AbsencePeriod, 'id'> }>(),
);

export const loadAbsencesSuccess = createAction('[Absence] save', props<{ absences: AbsencePeriod[] }>());

export const loadAbsences = createAction('[Absence] request');

export const toggleLoading = createAction('[Absence] toggleLoading', props<{ loading: boolean }>());

export const errorHandler = createAction('[Absence] error', props<{ errorMessage: string }>());
