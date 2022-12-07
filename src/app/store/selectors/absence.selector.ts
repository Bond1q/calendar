import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AbsenceReducer } from 'src/app/types/types';


export const featureSelector = createFeatureSelector<AbsenceReducer>('absence')
export const absencesSelector = createSelector(
	featureSelector,
	state => state.absencePeriods
);

