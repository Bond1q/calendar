import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AbsenceModule } from './absence/absence.module';
import { Absence } from './absence/absence.model';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env'
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env['POSTGRES_HOST'],
			port: Number(process.env['POSTGRES_PORT']),
			username: process.env['POSTGRES_USER'],
			password: process.env['POSTGRES_PASSWORD'],
			database: process.env['POSTGRES_DB'],
			entities: [Absence],
			synchronize: true,
		}),
		AbsenceModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule { }
