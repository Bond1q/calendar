import { AbsenceReducer } from '../../types/types';
import { createReducer, on } from '@ngrx/store';
import { loadAbsencesSuccess } from './absence.action';

const initialState: AbsenceReducer = {
	absencePeriods: [],
};

export const absenceReducer = createReducer(
	initialState,
	on(loadAbsencesSuccess, (state, action) => {
		return { ...state, absencePeriods: action.absences }
	})
);
