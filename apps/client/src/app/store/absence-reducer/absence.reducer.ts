import { AbsenceReducer } from '../../types/types';
import { createReducer, on } from '@ngrx/store';
import {
	loadAbsencesSuccess,
	toggleLoading,
	loadAbsences,
	createAbsence,
	updateAbsence,
	deleteAbsence,
	errorHandler,
} from './absence.action';

const initialState: AbsenceReducer = {
	absencePeriods: [],
	loading: false,
};

export const absenceReducer = createReducer(
	initialState,
	on(loadAbsences, (state) => {
		return { ...state, loading: true };
	}),
	on(createAbsence, (state) => {
		return { ...state, loading: true };
	}),
	on(updateAbsence, (state) => {
		return { ...state, loading: true };
	}),
	on(deleteAbsence, (state) => {
		return { ...state, loading: true };
	}),
	on(loadAbsencesSuccess, (state, action) => {
		return { ...state, absencePeriods: action.absences, loading: false };
	}),
	on(toggleLoading, (state, action) => {
		return { ...state, loading: action.loading };
	}),
	on(errorHandler, (state, action) => {
		console.error(action.errorMessage);
		return { ...state, loading: false };
	}),
);
