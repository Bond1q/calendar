import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AbsenceTypes } from 'src/app/types/types';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { createAbsence } from '../../store/absence-reducer/absence.action';
import { dateRangeValidator } from '../../shared/date-range-validator';
import { Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-absence-creator',
	templateUrl: './absence-creator.component.html',
	styleUrls: ['./absence-creator.component.scss'],
})
export class AbsenceCreatorComponent implements OnInit, OnDestroy {
	buttonDisabled = true;
	absenceForm = this.formBuilder.group(
		{
			absenceType: ['', [Validators.required]],
			dateStart: ['', [Validators.required]],
			dateEnd: ['', [Validators.required]],
			comment: ['', [Validators.required]],
		},
		{ validators: dateRangeValidator('dateStart', 'dateEnd') }
	);

	absenceTypesValues = Object.keys(AbsenceTypes);
	componentDestroyed$: Subject<boolean> = new Subject();

	constructor(
		public dialogRef: MatDialogRef<AbsenceCreatorComponent>,
		private formBuilder: FormBuilder,
		private store: Store
	) { }

	onClose(): void {
		this.dialogRef.close();
	}

	onRequest(): void {
		const newAbsence = {
			type: AbsenceTypes[
				this.absenceForm.controls.absenceType.value as keyof typeof AbsenceTypes
			],
			dateStart: new Date(this.absenceForm.controls.dateStart.value!),
			dateEnd: new Date(this.absenceForm.controls.dateEnd.value!),
			comment: this.absenceForm.controls.comment.value!,
		};
		this.store.dispatch(createAbsence({ absence: newAbsence }));
		this.dialogRef.close();
	}

	dateValidator(control: AbstractControl): ValidationErrors | null {
		const dateStart = control.get('dateStart')?.value;
		const dateEnd = control.get('dateEnd')?.value;
		if (moment(dateStart).isAfter(dateEnd)) {
			return { incorrectRange: true };
		}
		return null;
	}

	ngOnInit(): void {
		this.absenceForm.valueChanges
			.pipe(takeUntil(this.componentDestroyed$))
			.subscribe((value) => {
				if (this.absenceForm.valid) {
					this.buttonDisabled = false;
				} else {
					this.buttonDisabled = true;
				}
			});
	}

	ngOnDestroy(): void {
		this.componentDestroyed$.next(true);
		this.componentDestroyed$.complete();
	}
}
