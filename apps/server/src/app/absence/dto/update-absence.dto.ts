import { IsDateString } from "class-validator";
import { Absence as IAbsence } from 'shared/types';

export class UpdateAbsenceDto implements Pick<IAbsence, 'dateStart' | 'dateEnd'> {
	@IsDateString()
	readonly dateStart: Date;

	@IsDateString()
	readonly dateEnd: Date;

}