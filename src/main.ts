import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Set global API prefix, exclude /docs from prefix
  app.setGlobalPrefix('api', {
    exclude: ['docs', 'docs-json'],
  });

  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('Production Management API')
    .setDescription('API documentation for production management system')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `Application running on http://localhost:${process.env.PORT ?? 3000}`,
  );
  console.log(
    `Swagger UI available at http://localhost:${process.env.PORT ?? 3000}/docs`,
  );
}

bootstrap().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});
