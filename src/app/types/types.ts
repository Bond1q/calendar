
export enum AbsenceTypes {
	SICK = 'sick',
	VACATION = 'vacation'
}

export interface AbsencePeriod {
	type: AbsenceTypes;
	dateStart: Date;
	dateEnd: Date;
	comment: string;
	id: number;
}

export type AbsencePeriodInCalendar = {
	type: AbsencePeriod['type'];
	title: AbsencePeriod['comment'];
};

export interface DateInfo {
	date: Date;
	absenceList: AbsencePeriod[];
}

export interface AbsenceUpdaterComponentInput extends AbsencePeriod {
	onDelete: (id: number) => void;
	onUpdate: (dataStart: Date, dataEnd: Date, id: number) => void;
}