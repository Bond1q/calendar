import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import * as moment from 'moment';
import {
	AbsencePeriod,
	AbsencePeriodInCalendar,
	DateInfo,
	AbsenceTypes,
} from '../../types/types';

const list: AbsencePeriod[] = [
	{
		type: 'sick',
		dateStart: moment([2022, 11, 4]).toDate(),
		dateEnd: moment([2022, 11, 9]).toDate(),
		comment: 'I am ill',
	},
	{
		type: 'vacation',
		dateStart: moment([2022, 11, 8]).toDate(),
		dateEnd: moment([2022, 11, 19]).toDate(),
		comment: 'Day for chill',
	},
	{
		type: 'sick',
		dateStart: moment([2023, 1, 8]).toDate(),
		dateEnd: moment([2023, 1, 16]).toDate(),
		comment: 'I will be ill',
	},
	{
		type: 'vacation',
		dateStart: moment([2023, 2, 10]).toDate(),
		dateEnd: moment([2023, 2, 20]).toDate(),
		comment: 'Going to the sea',
	},
];

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
	readonly absenceTypes: AbsenceTypes[] = ['sick', 'vacation'];

	toppings = this._formBuilder.group(
		this.absenceTypes.reduce((acc: { [key: string]: boolean }, item) => {
			acc[item] = true;
			return acc;
		}, {})
	);

	constructor(private _formBuilder: FormBuilder) { }

	setAbsenceDays(dates: Date[]): DateInfo[] {
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
					prev.push({ type: item.type, title: item.comment });
				}
				return prev;
			}, [] as AbsencePeriodInCalendar[]);

			return { date, absenceList: newAbsenceList };
		});
	}

	setMonth(inc: number) {
		const year = moment(this.date).year();
		const month = moment(this.date).month();
		this.date = moment([year, month, 1]).add(inc, 'month').toDate();
		this.datesInfo = this.setAbsenceDays(this.getCalendarDays(this.date));
	}

	isSameMonth(date: Date) {
		return moment(date).isSame(moment(this.date), 'month');
	}

	isToday(date: Date) {
		return moment(date).isSame(moment());
	}

	backToToday() {
		this.date = moment().toDate();
		this.datesInfo = this.setAbsenceDays(this.getCalendarDays(this.date));
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
		console.log(year);

		const firstDayOfMonth = moment([year, month, 1]);
		return Array.from(Array(7).keys())
			.map((num) => moment(firstDayOfMonth).subtract(num, 'days'))
			.find((dt) => {
				return dt.weekday() === 1;
			});
	}

	ngOnInit(): void {
		this.toppings.valueChanges.subscribe((values) => {
			this.datesInfo = this.setAbsenceDays(this.getCalendarDays(this.date));
		});
		this.datesInfo = this.setAbsenceDays(this.getCalendarDays(this.date));
	}
}
