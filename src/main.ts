import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import csurf from 'csurf'
import * as helmet from 'helmet'
import * as rateLimit from 'express-rate-limit'
import AppModule from './app.module'
import config from './app.config'

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  SwaggerModule.setup(
    '/',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Nest App API')
        .setDescription('API documentation for Nest App')
        .setVersion('1.0')
        .addBearerAuth()
        .build(),
    ),
  )

  app.use(helmet())

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  )

  app.use(csurf())

  await app.listen(config.port)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}

bootstrap()
