import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, of, switchMap } from 'rxjs';
import { AbsenceService } from '../../services/absence.service';
import { loadAbsences, loadAbsencesSuccess, createAbsence, updateAbsence, toggleLoading, errorHandler } from '../absence-reducer/absence.action';
import { deleteAbsence } from './../absence-reducer/absence.action';
import { Store } from '@ngrx/store';

@Injectable()
export class AbsenceEffect {
	constructor(private actions$: Actions, private absenceService: AbsenceService, private store: Store) { }

	loadAbsences$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(loadAbsences),
			mergeMap(() => {
				return this.absenceService.getAllAbsences().pipe(
					map((data) => {
						return loadAbsencesSuccess({ absences: data });
					},),
				);
			}),
			catchError(error => of(errorHandler(error)))
		);
	});

	createdAbsence$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(createAbsence),
			mergeMap((action) => {
				return this.absenceService.createAbsence(action.absence).pipe(map(() => loadAbsences()));
			}),
			catchError(error => of(errorHandler(error)))
		);
	});

	updateAbsence$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(updateAbsence),
			mergeMap((action) => {
				const absence = {
					dateStart: action.dateStart,
					dateEnd: action.dateEnd,
				};
				return this.absenceService.updateAbsence(action.id, absence).pipe(
					map(() => loadAbsences()),
				);
			}),
			catchError(error => of(errorHandler(error)))
		);
	});

	deleteAbsence$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(deleteAbsence),
			mergeMap((action) => {
				return this.absenceService.deleteAbsence(action.id).pipe(map(() => loadAbsences()));
			}),
			catchError(error => of(errorHandler(error)))
		);
	});
}
