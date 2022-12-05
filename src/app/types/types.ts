export type AbsenceTypes = 'sick' | 'vacation'

export interface AbsencePeriod {
	type: AbsenceTypes;
	dateStart: Date;
	dateEnd: Date;
	comment: string;
}

export type AbsencePeriodInCalendar = {
	type: AbsencePeriod['type'];
	title: AbsencePeriod['comment'];
};

export interface DateInfo {
	date: Date;
	absenceList: AbsencePeriodInCalendar[];
}