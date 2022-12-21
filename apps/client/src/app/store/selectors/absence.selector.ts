import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AbsenceReducer } from '../../types/types';

export const featureSelector = createFeatureSelector<AbsenceReducer>('absence');
export const absencesSelector = createSelector(
	featureSelector,
	(state) => state.absencePeriods
);

export const loadingSelector = createSelector(
	featureSelector,
	(state) => state.loading
)