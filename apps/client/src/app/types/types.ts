import { AbsenceTypes, Absence as AbsencePeriod } from 'shared/types';

export type AbsencePeriodInCalendar = {
	type: AbsencePeriod['type'];
	title: AbsencePeriod['comment'];
};

export interface DateInfo {
	date: Date;
	absenceList: AbsencePeriod[];
}

export interface AbsenceReducer {
	absencePeriods: AbsencePeriod[];
	isLoading: boolean;
}
