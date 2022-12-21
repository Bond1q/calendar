import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { AbsenceService } from './absence.service';
import { CreateAbsenceDto } from './dto/create-absence.dto';
import { UpdateAbsenceDto } from './dto/update-absence.dto';
import { DatesValidationPipe } from './pipes/validation.pipe';

@Controller('absence')
export class AbsenceController {
	constructor(private absenceService: AbsenceService) { }

	@Get()
	getAllAbsence() {
		return this.absenceService.getAllAbsence();
	}

	@Post()
	@UsePipes(ValidationPipe)
	@UsePipes(DatesValidationPipe)
	createAbsence(@Body() absence: CreateAbsenceDto) {
		return this.absenceService.createAbsence(absence);
	}

	@Put(':id')
	@UsePipes(ValidationPipe)
	@UsePipes(DatesValidationPipe)
	updateAbsence(@Param('id', ParseUUIDPipe) id: string, @Body() absence: UpdateAbsenceDto) {
		return this.absenceService.updateAbsence(id, absence);
	}

	@Delete(':id')
	@UsePipes(ValidationPipe)
	deleteAbsence(@Param('id', ParseUUIDPipe) id: string) {
		return this.absenceService.deleteAbsence(id);
	}
}
