import { Component, Inject, OnInit } from '@angular/core';
import {
	MatDialog,
	MAT_DIALOG_DATA,
	MatDialogRef,
} from '@angular/material/dialog';
import { AbsencePeriod } from 'src/app/types/types';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';

export interface AbsenceUpdaterComponentInput extends AbsencePeriod {
	onDelete: (id: number) => void;
	onUpdate: (dataStart: Date, dataEnd: Date, id: number) => void;
}

@Component({
	selector: 'app-absence-updater',
	templateUrl: './absence-updater.component.html',
	styleUrls: ['./absence-updater.component.scss'],
})
export class AbsenceUpdaterComponent implements OnInit {
	selected = '';
	isDisabled = true;
	dates = this.formBuilder.group({
		dateStart: [this.data.dateStart, Validators.required],
		dateEnd: [this.data.dateEnd, Validators.required],
	});

	constructor(
		public dialogRef: MatDialogRef<AbsenceUpdaterComponent>,
		@Inject(MAT_DIALOG_DATA) public data: AbsenceUpdaterComponentInput,
		private formBuilder: FormBuilder
	) { }

	ngOnInit(): void {
		this.dates.valueChanges.subscribe((value) => {
			if (
				(!moment(value.dateStart).isSame(this.data.dateStart, 'day') ||
					!moment(value.dateEnd).isSame(this.data.dateEnd, 'day')) &&
				(!this.dates.controls.dateEnd.errors && !this.dates.controls.dateStart.errors)
			) {
				this.isDisabled = false;
			} else {
				this.isDisabled = true;
			}
		});
	}
	onDeleteHandle(): void {
		this.data.onDelete(this.data.id);
		this.dialogRef.close();
	}
	onUpdateHandle(): void {
		this.data.onUpdate(this.dates.value.dateStart!, this.dates.value.dateEnd!, this.data.id);
		this.dialogRef.close();
	}
}
