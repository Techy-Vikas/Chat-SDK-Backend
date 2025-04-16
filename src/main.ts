import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS for multiple origins
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'https://the-story-isnt-over.vercel.app/', 'https://the-story-isnt-over.vercel.app'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('ChatGPT API')
    .setDescription('ChatGPT + Auth APIs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
