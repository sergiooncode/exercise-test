import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { AppModule } from './app.module';

dotenv.config({ path: resolve(__dirname, '../.env') });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
