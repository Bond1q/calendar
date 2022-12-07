import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';


export const dateRangeValidator = (field1: string, field2: string): ValidatorFn => {
	return (control: AbstractControl): ValidationErrors | null => {
		const dateStart = control.get(field1)?.value;
		const dateEnd = control.get(field2)?.value;
		if (moment(dateStart).isAfter(dateEnd)) {
			return { 'incorrectRange': true }
		}
		const date = control.value
		if (!moment(date).isValid()) {
			return { 'incorrectDate': true }
		}
		return null;
	}
}



