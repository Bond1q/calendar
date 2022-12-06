import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbsenceUpdaterComponentInput } from 'src/app/types/types';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
	selector: 'app-absence-updater',
	templateUrl: './absence-updater.component.html',
	styleUrls: ['./absence-updater.component.scss'],
})
export class AbsenceUpdaterComponent implements OnInit {
	isDisabled = true;
	dates = this.formBuilder.group({
		dateStart: [this.inputData.dateStart, Validators.required],
		dateEnd: [this.inputData.dateEnd, Validators.required],
	});

	constructor(
		public dialogRef: MatDialogRef<AbsenceUpdaterComponent>,
		@Inject(MAT_DIALOG_DATA) public inputData: AbsenceUpdaterComponentInput,
		private formBuilder: FormBuilder
	) { }

	ngOnInit(): void {
		this.dates.valueChanges.subscribe((value) => {
			if (
				(!moment(value.dateStart).isSame(this.inputData.dateStart, 'day') ||
					!moment(value.dateEnd).isSame(this.inputData.dateEnd, 'day')) &&
				!this.dates.controls.dateEnd.errors &&
				!this.dates.controls.dateStart.errors
			) {
				this.isDisabled = false;
			} else {
				this.isDisabled = true;
			}
		});
	}

	onDeleteHandle(): void {
		this.inputData.onDelete(this.inputData.id);
		this.dialogRef.close();
	}

	onUpdateHandle(): void {
		this.inputData.onUpdate(
			this.dates.value.dateStart!,
			this.dates.value.dateEnd!,
			this.inputData.id
		);
		this.dialogRef.close();
	}
}
