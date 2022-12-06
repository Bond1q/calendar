import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import * as moment from 'moment';
import {
	AbsencePeriod,
	DateInfo,
	AbsenceUpdaterComponentInput,
	AbsenceTypes,
} from '../../types/types';

import { AbsenceUpdaterComponent } from '../absence-updater/absence-updater.component';

import { list } from '../../data';

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
	datesInfo: DateInfo[] = [];
	date = new Date();
	absenceList = list;

	readonly days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	readonly absenceTypes = Object.values(AbsenceTypes);
	readonly AbsenceTypes = AbsenceTypes;
	toppings = this.formBuilder.group(
		this.absenceTypes.reduce((acc: { [key: string]: boolean }, item) => {
			acc[item] = true;
			return acc;
		}, {})
	);

	constructor(private formBuilder: FormBuilder, public dialog: MatDialog) { }

	addAbsenceDays(dates: Date[]): DateInfo[] {
		return dates.map((date) => {
			const newAbsenceList = this.absenceList.reduce((prev, item) => {
				if (
					moment(date).isBetween(
						moment(item.dateStart),
						moment(item.dateEnd),
						undefined,
						'[]'
					) &&
					this.toppings.value[item.type]
				) {
					prev.push({
						type: item.type,
						comment: item.comment,
						dateStart: item.dateStart,
						dateEnd: item.dateEnd,
						id: item.id,
					});
				}
				return prev;
			}, [] as AbsencePeriod[]);

			return { date, absenceList: newAbsenceList };
		});
	}

	nextMonth() {
		this.date = moment(this.date).add(1, 'month').toDate();
		this.datesInfo = this.addAbsenceDays(this.getCalendarDays(this.date));
	}

	prevMonth() {
		this.date = moment(this.date).subtract(1, 'month').toDate();
		this.datesInfo = this.addAbsenceDays(this.getCalendarDays(this.date));
	}

	isSameMonth(date: Date) {
		return moment(date).isSame(moment(this.date), 'month');
	}

	isToday(date: Date) {
		return moment(date).isSame(moment(), 'day');
	}

	backToToday() {
		this.date = moment().toDate();
		this.datesInfo = this.addAbsenceDays(this.getCalendarDays(this.date));
	}

	getCalendarDays(date = new Date()) {
		const calendarStartTime = this.getCalendarStartDay(date);

		return Array.from(Array(42).keys()).map((num) => {
			return moment(calendarStartTime).add(num, 'days').toDate();
		});
	}

	getCalendarStartDay(date = new Date()) {
		const year = moment(date).year();
		const month = moment(date).month();

		const firstDayOfMonth = moment([year, month, 1]);
		return Array.from(Array(7).keys())
			.map((num) => moment(firstDayOfMonth).subtract(num, 'days'))
			.find((dt) => {
				return dt.weekday() === 1;
			});
	}

	openDialog(absence: AbsencePeriod): void {
		const dialogRef = this.dialog.open(AbsenceUpdaterComponent, {
			width: '500px',
			data: {
				...absence,
				//Ці методи будуть у компонені absence updater, коли буде ngrx
				onDelete: (id: number) => {
					this.absenceList = list.filter((el) => el.id !== id);
					console.log(this.absenceList);

					this.datesInfo = this.addAbsenceDays(this.getCalendarDays(this.date));
					console.log(list);
				},
				onUpdate: (dateStart: Date, dateEnd: Date, id: number) => {
					this.absenceList = list.map((el) => {
						if (el.id == id) {
							el.dateStart = dateStart;
							el.dateEnd = dateEnd;
						}
						return el;
					});
					this.datesInfo = this.addAbsenceDays(this.getCalendarDays(this.date));
				},
			} as AbsenceUpdaterComponentInput,
		});
	}

	ngOnInit(): void {
		this.toppings.valueChanges.subscribe((values) => {
			this.datesInfo = this.addAbsenceDays(this.getCalendarDays(this.date));
		});
		this.datesInfo = this.addAbsenceDays(this.getCalendarDays(this.date));
	}
}
