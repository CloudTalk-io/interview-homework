import './config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabaseInitService } from './database/database-init.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, { cors: true });

    // Use global validation pipe
    app.useGlobalPipes(new ValidationPipe());

    // Initialize the database
    const databaseInitService = app.get(DatabaseInitService);
    await databaseInitService.initDatabase();

    // Start the application
    await app.listen(3000);
    console.log('Application is running on: http://localhost:3000');
  } catch (error) {
    console.error('Error during application bootstrap', error);
    process.exit(1);
  }
}

bootstrap();
