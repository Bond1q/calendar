import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { find } from 'rxjs';
import { Between, Not, Repository } from 'typeorm';
import { Absence, IAbsence } from './absence.model';
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
		const finded = await this.absenceRepository.find({
			where: {
				dateStart: Between(moment(absence.dateStart).toDate(), moment(absence.dateEnd).toDate()),
				dateEnd: Between(moment(absence.dateStart).toDate(), moment(absence.dateEnd).toDate()),
			}
		})
		if (finded.length === 0) {
			const createdAbsence = await this.absenceRepository.insert(absence);
			return createdAbsence.raw
		}
		throw new HttpException('There is absence in this period in database', HttpStatus.CONFLICT);
	}

	async updateAbsence(id: string, absence: UpdateAbsenceDto) {
		const finded = await this.absenceRepository.find({
			where: {
				dateStart: Between(moment(absence.dateStart).toDate(), moment(absence.dateEnd).toDate()),
				dateEnd: Between(moment(absence.dateStart).toDate(), moment(absence.dateEnd).toDate()),
				id: Not(id)
			}
		})

		if (finded.length !== 0) {
			throw new HttpException('There is absence in this period in database', HttpStatus.CONFLICT);
		}

		const updatedAbsence = await this.absenceRepository.update(id, absence);

		if (updatedAbsence.affected) return this.absenceRepository.findOneBy({ id: id })
		throw new HttpException('There is not such id in database', HttpStatus.BAD_REQUEST);
	}

	async deleteAbsence(id: string) {
		const res = await this.absenceRepository.delete(id);
		if (res.affected) return this.absenceRepository.findOneBy({ id: id })
		throw new HttpException('There is not such id in database', HttpStatus.BAD_REQUEST);
	}
}
