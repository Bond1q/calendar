import { IsDateString, IsEnum, IsString, MaxLength, MinLength } from "class-validator";
import { AbsenceTypes, Absence as IAbsence } from 'types/index';

export class CreateAbsenceDto implements Omit<IAbsence, 'id'> {
	@IsEnum(AbsenceTypes, { message: "Incorrect absence type" })
	readonly type: AbsenceTypes;

	@IsDateString()
	readonly dateStart: Date;

	@IsDateString()
	readonly dateEnd: Date;

	@IsString()
	@MinLength(1)
	@MaxLength(200)
	readonly comment: string;
}