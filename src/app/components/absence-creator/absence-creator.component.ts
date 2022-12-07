import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AbsenceTypes } from 'src/app/types/types';
import {
	AbstractControl,
	FormBuilder,
	ValidationErrors,
	Validators,
} from '@angular/forms';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { createAbsence } from './../../store/absenceReducer/absence.action';
import { dateRangeValidator } from '../../shared/date-range-validator';

@Component({
	selector: 'app-absence-creator',
	templateUrl: './absence-creator.component.html',
	styleUrls: ['./absence-creator.component.scss'],
})
export class AbsenceCreatorComponent {
	isDisabled = true;
	absenceForm = this.formBuilder.group({
		absenceType: ['', [Validators.required]],
		dateStart: ['', [Validators.required]],
		dateEnd: ['', [Validators.required]],
		comment: ['', [Validators.required]],
	});

	types = Object.keys(AbsenceTypes);
	selectedType = '';
	constructor(
		public dialogRef: MatDialogRef<AbsenceCreatorComponent>,
		private formBuilder: FormBuilder,
		private store: Store
	) { }

	ngOnInit(): void {
		this.absenceForm.setValidators(dateRangeValidator('dateStart', 'dateEnd'));
		this.absenceForm.valueChanges.subscribe((value) => {
			console.log(this.absenceForm.controls.absenceType.value);

			if (
				!this.absenceForm.controls.dateEnd.errors &&
				!this.absenceForm.controls.absenceType.errors &&
				!this.absenceForm.controls.comment.errors &&
				!this.absenceForm.controls.dateStart.errors &&
				!this.absenceForm.hasError('incorrectRange')
			) {
				this.isDisabled = false;
			} else {
				this.isDisabled = true;
			}
		});
	}

	onClose(): void {
		this.dialogRef.close();
	}

	onRequest(): void {
		const newAbsence = {
			type: AbsenceTypes[
				this.absenceForm.controls.absenceType.value as keyof typeof AbsenceTypes
			],
			dateStart: new Date(String(this.absenceForm.controls.dateStart.value)),
			dateEnd: new Date(String(this.absenceForm.controls.dateEnd.value)),
			comment: String(this.absenceForm.controls.comment.value),
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
}
