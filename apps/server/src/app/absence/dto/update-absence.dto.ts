import { IsDateString } from "class-validator";
import { Absence as IAbsence } from 'types/index';

export class UpdateAbsenceDto implements Pick<IAbsence, 'dateStart' | 'dateEnd'> {
	@IsDateString()
	readonly dateStart: Date;

	@IsDateString()
	readonly dateEnd: Date;

}