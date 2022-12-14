import { IsDate, IsDateString, IsEnum, IsNumber, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { IAbsence, AbsenceTypes } from "../absence.model";
import { Type } from 'class-transformer';

export class UpdateAbsenceDto implements Omit<IAbsence, 'comment' | 'type' | 'id'> {
	@IsDateString()
	readonly dateStart: Date;

	@IsDateString()
	readonly dateEnd: Date;

}