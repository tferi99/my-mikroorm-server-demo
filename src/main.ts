import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabaseSchemaCreator } from './orm/database-schema-creator';

const argv = process.argv.slice(2);

if (argv.includes('createdbschema')) {
  try {
    DatabaseSchemaCreator.create(true);
  } catch (e) {
    console.log('ERROR:', e);
  }
} else {
  async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
      logger: console,
    });
    await app.listen(3000);
  }

  bootstrap();
}
