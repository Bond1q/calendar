import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbsencePeriod } from 'src/app/types/types';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { deleteAbsence, updateAbsence, } from '../../store/absence-reducer/absence.action';
import { dateRangeValidator } from '../../shared/date-range-validator';
import { Subject, takeUntil } from 'rxjs';
@Component({
	selector: 'app-absence-updater',
	templateUrl: './absence-updater.component.html',
	styleUrls: ['./absence-updater.component.scss'],
})
export class AbsenceUpdaterComponent implements OnInit, OnDestroy {
	buttonDisabled = true;
	dates = this.formBuilder.group(
		{
			dateStart: [this.inputData.dateStart, [Validators.required]],
			dateEnd: [this.inputData.dateEnd, [Validators.required]],
		},
		{ validators: dateRangeValidator('dateStart', 'dateEnd') }
	);
	componentDestroyed$: Subject<boolean> = new Subject();

	constructor(
		public dialogRef: MatDialogRef<AbsenceUpdaterComponent>,
		@Inject(MAT_DIALOG_DATA) public inputData: AbsencePeriod,
		private formBuilder: FormBuilder,
		private store: Store
	) { }

	ngOnInit(): void {
		this.dates.valueChanges
			.pipe(takeUntil(this.componentDestroyed$))
			.subscribe((value) => {
				if (
					(!moment(value.dateStart).isSame(this.inputData.dateStart, 'day') ||
						!moment(value.dateEnd).isSame(this.inputData.dateEnd, 'day')) &&
					this.dates.valid
				) {
					this.buttonDisabled = false;
				} else {
					this.buttonDisabled = true;
				}
			});
	}

	onDeleteHandle(): void {
		this.store.dispatch(deleteAbsence({ id: this.inputData.id }));
		this.dialogRef.close();
	}

	onUpdateHandle(): void {
		this.store.dispatch(
			updateAbsence({
				id: this.inputData.id,
				dateStart: this.dates.value.dateStart!,
				dateEnd: this.dates.value.dateEnd!,
			})
		);
		this.dialogRef.close();
	}

	dateValidator(control: AbstractControl): ValidationErrors | null {
		const dateStart = control.get('dateStart')?.value;
		const dateEnd = control.get('dateEnd')?.value;
		if (moment(dateStart).isAfter(dateEnd)) {
			return { incorrectRange: true };
		}
		const date = control.value;
		if (!moment(date).isValid()) {
			return { incorrectDate: true };
		}
		return null;
	}

	ngOnDestroy(): void {
		this.componentDestroyed$.next(true);
		this.componentDestroyed$.complete();
	}
}
