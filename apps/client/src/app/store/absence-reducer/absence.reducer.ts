import { AbsenceReducer } from '../../types/types';
import { createReducer, on } from '@ngrx/store';
import { loadAbsencesSuccess, toggleLoading, loadAbsences, createAbsence, updateAbsence, deleteAbsence } from './absence.action';

const initialState: AbsenceReducer = {
	absencePeriods: [],
	isLoading: false
};

export const absenceReducer = createReducer(
	initialState,
	on(loadAbsences, (state) => {
		return { ...state, isLoading: true }
	}),
	on(createAbsence, (state) => {
		return { ...state, isLoading: true }
	}),
	on(updateAbsence, (state) => {
		return { ...state, isLoading: true }
	}),
	on(deleteAbsence, (state) => {
		return { ...state, isLoading: true }
	}),
	on(loadAbsencesSuccess, (state, action) => {

		return { ...state, absencePeriods: action.absences, isLoading: false };
	}),
	on(toggleLoading, (state, action) => {
		return { ...state, isLoading: action.isLoading }
	}),

);
