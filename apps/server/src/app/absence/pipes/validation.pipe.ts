import { ArgumentMetadata, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PipeTransform } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { CreateAbsenceDto } from '../dto/create-absence.dto';
import * as moment from 'moment';
import { AbsenceTypes } from 'shared/types';
import { UpdateAbsenceDto } from './../dto/update-absence.dto';

@Injectable()
export class DatesValidationPipe implements PipeTransform {
	async transform(value: CreateAbsenceDto | UpdateAbsenceDto, metadata: ArgumentMetadata) {
		const obj = plainToClass(metadata.metatype!, value);
		if (moment(value.dateStart).isAfter(moment(value.dateEnd), 'day')) {
			throw new HttpException('Date start cannot be after date end', HttpStatus.BAD_REQUEST);
		}
		if (
			'type' in value &&
			value.type !== AbsenceTypes.SICK &&
			moment(value.dateStart).isBefore(moment(), 'day')
		) {
			throw new HttpException(
				`Cannot create absence with type: ${value.type} in the past`,
				HttpStatus.BAD_REQUEST,
			);
		}
		return value;
	}
}
