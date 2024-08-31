import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { INestApplication } from '@nestjs/common';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<INestApplication>(AppModule);
  app.setGlobalPrefix('apis');
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.enableCors({ origin: '*', credentials: true });

  app.use(
    '/graphql',
    graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 5 }),
  );

  await app.listen(5000, '0.0.0.0', async () => {
    const url = await app.getUrl();
    const { pid } = process;
    const prefix = 'W';
    console.log(`[${prefix + pid}] Server running on ${url}`);
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
