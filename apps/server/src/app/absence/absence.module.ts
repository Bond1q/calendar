import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbsenceController } from './absence.controller';
import { Absence } from './absence.model';
import { AbsenceService } from './absence.service';

@Module({
	imports: [TypeOrmModule.forFeature([Absence])],
	controllers: [AbsenceController],
	providers: [AbsenceService],
})
export class AbsenceModule { }
