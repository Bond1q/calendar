import { AbsencePeriod, AbsenceTypes } from "./types/types";
import * as moment from 'moment';

export let list: AbsencePeriod[] = [
	{
		type: AbsenceTypes.SICK,
		dateStart: moment([2022, 11, 4]).toDate(),
		dateEnd: moment([2022, 11, 9]).toDate(),
		comment: 'I am ill',
		id: 1
	},
	{
		type: AbsenceTypes.VACATION,
		dateStart: moment([2022, 11, 8]).toDate(),
		dateEnd: moment([2022, 11, 19]).toDate(),
		comment: 'Day for chill',
		id: 2
	},
	{
		type: AbsenceTypes.SICK,
		dateStart: moment([2023, 1, 8]).toDate(),
		dateEnd: moment([2023, 1, 16]).toDate(),
		comment: 'I will be ill',
		id: 3
	},
	{
		type: AbsenceTypes.VACATION,
		dateStart: moment([2023, 2, 10]).toDate(),
		dateEnd: moment([2023, 2, 20]).toDate(),
		comment: 'Going to the sea',
		id: 4
	},
];