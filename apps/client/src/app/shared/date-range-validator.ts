import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';
import { Absence as AbsencePeriod } from 'shared/types';

export const dateRangeValidator = (
	field1: string,
	field2: string,
	absences: AbsencePeriod[],
	absenceId: string = ''
): ValidatorFn => {
	return (control: AbstractControl): ValidationErrors | null => {
		const dateStart = control.get(field1)?.value;
		const dateEnd = control.get(field2)?.value;
		if (moment(dateStart).isAfter(dateEnd)) {
			return { incorrectRange: true };
		}
		for (let el of absences) {
			if (el.id !== absenceId) {
				let day = el.dateStart;
				while (!moment(day).isSame(moment(el.dateEnd).add(1, 'day'), 'day')) {
					if (
						moment(day).isBetween(
							moment(dateStart),
							moment(dateEnd),
							undefined,
							'[]'
						)
					) {
						return { absencesOverlapped: true };
					}
					day = moment(day).add(1, 'day').toDate();
				}
			}
		}

		const date = control.value;
		if (!moment(date).isValid()) {
			return { incorrectDate: true };
		}
		return null;
	};
};
