import { Component, OnDestroy } from '@angular/core';
import { AbsenceTypes, AbsencePeriod } from 'src/app/types/types';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { absencesSelector } from 'src/app/store/selectors/absence.selector';
import { Subscription } from 'rxjs';

interface AbsenceList {
	[key: string]: Array<{
		title: string;
		passed: number;
		duration: number;
		daysLeft: number;
	}>;
}

@Component({
	selector: 'app-absences',
	templateUrl: './absences.component.html',
	styleUrls: ['./absences.component.scss'],
})
export class AbsencesComponent implements OnDestroy {
	readonly AbsenceTypes = AbsenceTypes;
	readonly absenceTypesValues = Object.values(AbsenceTypes);
	subscription: Subscription;
	absencesList: AbsenceList = {};

	constructor(private store: Store) {
		this.subscription = this.store.select(absencesSelector).subscribe((data) => {
			this.absencesList = data.reduce((prev: any, cur: AbsencePeriod) => {
				if (!(cur.type in prev)) {
					prev[cur.type] = [];
				}
				const differBetweenTodayAndAbsenceStart = moment().diff(moment(cur.dateStart), 'days');
				let passed = 0;

				const duration = moment(cur.dateEnd).diff(moment(cur.dateStart), 'days') + 1;

				if (differBetweenTodayAndAbsenceStart > 0 && duration < differBetweenTodayAndAbsenceStart) {
					passed = duration;
				} else if (differBetweenTodayAndAbsenceStart <= 0) {
					passed = 0;
				} else {
					passed = differBetweenTodayAndAbsenceStart;
				}

				const daysLeft = duration - passed;

				prev[cur.type].push({
					title: cur.comment,
					passed: passed,
					duration: duration,
					daysLeft: daysLeft > 0 ? daysLeft : 0,
				});
				return prev;
			}, {});
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
