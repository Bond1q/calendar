import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AbsenceTypes, Absence as IAbsence } from 'shared/types';

@Entity()
export class Absence implements IAbsence {
	@Column({ type: 'enum', enum: AbsenceTypes })
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
