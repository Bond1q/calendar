import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Not, Repository } from 'typeorm';
import { Absence } from './absence.model';
import { AbsenceTypes } from 'shared/types';
import * as moment from 'moment';
import { CreateAbsenceDto } from './dto/create-absence.dto';
import { UpdateAbsenceDto } from './dto/update-absence.dto';
@Injectable()
export class AbsenceService {
	constructor(
		@InjectRepository(Absence)
		private absenceRepository: Repository<Absence>,
	) { }

	async getAllAbsence(): Promise<Absence[]> {
		return this.absenceRepository.find();
	}

	async createAbsence(absence: CreateAbsenceDto) {
		if (absence.type !== AbsenceTypes.SICK && moment(absence.dateStart).isBefore(moment(), 'day')) {
			throw new HttpException(
				`Cannot create absence with type: ${absence.type} in the past`,
				HttpStatus.BAD_REQUEST,
			);
		}
		const findedAbsences = await this.absenceRepository.find({
			where: {
				dateStart: Between(moment(absence.dateStart).toDate(), moment(absence.dateEnd).toDate()),
				dateEnd: Between(moment(absence.dateStart).toDate(), moment(absence.dateEnd).toDate()),
			},
		});
		if (findedAbsences.length === 0) {
			const result = await this.absenceRepository.insert(absence);
			return this.absenceRepository.findOneBy({ id: result.raw[0].id });
		}
		throw new HttpException('There is absence in this period in database', HttpStatus.BAD_REQUEST);
	}

	async updateAbsence(id: string, absence: UpdateAbsenceDto) {
		const findedAbsences = await this.absenceRepository.find({
			where: {
				dateStart: Between(moment(absence.dateStart).toDate(), moment(absence.dateEnd).toDate()),
				dateEnd: Between(moment(absence.dateStart).toDate(), moment(absence.dateEnd).toDate()),
				id: Not(id),
			},
		});

		if (findedAbsences.length !== 0) {
			throw new HttpException('There is absence in this period in database', HttpStatus.BAD_REQUEST);
		}

		const result = await this.absenceRepository.update(id, absence);

		if (result.affected) return this.absenceRepository.findOneBy({ id: id });
		throw new HttpException('There is not such id in database', HttpStatus.BAD_REQUEST);
	}

	async deleteAbsence(id: string) {
		const res = await this.absenceRepository.delete(id);
		if (res.affected) return this.absenceRepository.findOneBy({ id: id });
		throw new HttpException('There is not such id in database', HttpStatus.BAD_REQUEST);
	}
}
