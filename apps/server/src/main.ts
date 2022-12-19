
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true });
	const port = process.env['PORT'] || 3333;
	app.setGlobalPrefix('calendar-server.netlify.app')
	await app.listen(port);
	Logger.log(
		`🚀 Application is running on: http://localhost:${port}`
	);
}

bootstrap();
