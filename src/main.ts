import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as csurf from 'csurf'
import * as cookieParser from 'cookie-parser'
import * as compression from 'compression'
import * as rateLimit from 'express-rate-limit'
import LoggerInterceptor from '@/interceptors/logger.interceptor'
import AppModule from './app.module'
import config from './app.config'
const helmet = require('helmet')

declare const module: any

const whitelist = [
  'http://127.0.0.1:3000',
  'http://localhost:3000',
  'https://postwoman.io',
]

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: (origin, callback) => {
        if (whitelist.indexOf(origin) > -1) {
          callback(null, true)
        } else {
          callback(null, false)
        }
      },
      methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
      credentials: true,
    },
    // enable logger will break the app on production.
    ...(config.isDev ? { logger: true } : {}),
  })

  app.setGlobalPrefix('/api/v1')

  // see https://expressjs.com/en/guide/behind-proxies.html
  app.set('trust proxy', 1)

  app.disable('X-Powered-By')

  SwaggerModule.setup(
    '/',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Nest Starter API')
        .setDescription('API documentation for Nest Starter')
        .setVersion('1.0')
        .addBearerAuth()
        .build(),
    ),
  )

  app.useGlobalInterceptors(new LoggerInterceptor())

  app.use(compression())

  app.use(helmet())

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  )

  app.use(cookieParser())

  app.use(csurf({ cookie: true }))

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(config.port)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}

bootstrap()
