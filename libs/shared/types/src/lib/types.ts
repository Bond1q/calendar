export enum AbsenceTypes {
	SICK = 'sick',
	VACATION = 'vacation',
}

export interface Absence {
	type: AbsenceTypes;
	dateStart: Date;
	dateEnd: Date;
	comment: string;
	id: string;
}