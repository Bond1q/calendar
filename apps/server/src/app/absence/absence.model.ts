import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum AbsenceTypes {
	SICK = 'sick',
	VACATION = 'vacation',
}

export interface IAbsence {
	type: AbsenceTypes;
	dateStart: Date;
	dateEnd: Date;
	comment: string;
	id: string;
}

@Entity()
export class Absence implements IAbsence {
	@Column()
	type: AbsenceTypes;

	@Column()
	dateStart: Date;

	@Column()
	dateEnd: Date;

	@Column()
	comment: string;

	@PrimaryGeneratedColumn("uuid")
	id: string;
}
