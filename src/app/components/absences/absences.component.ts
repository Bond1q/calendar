import { Component } from '@angular/core';
import { AbsenceTypes, AbsencePeriod } from 'src/app/types/types';
import { list } from '../../data';
import * as moment from 'moment';

@Component({
	selector: 'app-absences',
	templateUrl: './absences.component.html',
	styleUrls: ['./absences.component.scss'],
})
export class AbsencesComponent {
	readonly AbsenceTypes = AbsenceTypes;
	readonly absenceTypes = Object.values(AbsenceTypes);

	readonly absences = list.reduce((prev: any, cur: AbsencePeriod) => {
		if (!(cur.type in prev)) {
			prev[cur.type] = [];
		}
		const passed = moment().diff(moment(cur.dateStart), 'days');
		const duration =
			moment(cur.dateEnd).diff(moment(cur.dateStart), 'days') + 1;
		const daysLeft = duration - passed;
		prev[cur.type].push({
			title: cur.comment,
			passed: passed > 0 ? passed : 0,
			duration: duration,
			daysLeft: passed > 0 ? daysLeft : duration,
		});
		return prev;
	}, {});
}
