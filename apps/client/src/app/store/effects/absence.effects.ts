import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs';
import { AbsenceService } from '../../services/absence.service';
import { loadAbsences, loadAbsencesSuccess, createAbsence, updateAbsence } from '../absence-reducer/absence.action';
import { deleteAbsence } from './../absence-reducer/absence.action';

@Injectable()
export class AbsenceEffect {
	constructor(private actions$: Actions, private absenceService: AbsenceService) { }

	loadAbsences$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(loadAbsences),
			mergeMap(() =>
				this.absenceService.getAllAbsences().pipe(map((data) => loadAbsencesSuccess({ absences: data }))),
			),
		);
	});

	createdAbsence$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(createAbsence),
			mergeMap((action) =>
				this.absenceService.createAbsence(action.absence).pipe(map(() => loadAbsences())),
			),
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
				return this.absenceService.updateAbsence(action.id, absence).pipe(map(() => loadAbsences()));
			}),
		);
	});

	deleteAbsence$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(deleteAbsence),
			mergeMap((action) => {
				return this.absenceService.deleteAbsence(action.id).pipe(map(() => loadAbsences()));
			}),
		);
	});
}