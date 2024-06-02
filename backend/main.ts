import './config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabaseInitService } from './database/database-init.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const databaseInitService = app.get(DatabaseInitService);
  await databaseInitService.initDatabase();
  await app.listen(3000);
}

bootstrap();
