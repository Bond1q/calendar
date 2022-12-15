import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AbsenceTypes, Absence as IAbsence } from 'types/index';

AbsenceTypes
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
