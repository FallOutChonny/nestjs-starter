import { NestFactory, Reflector } from '@nestjs/core'
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationError } from 'class-validator'
import * as csurf from 'csurf'
import * as cookieParser from 'cookie-parser'
import * as compression from 'compression'
import * as rateLimit from 'express-rate-limit'
import LoggerInterceptor from '@/interceptors/logger.interceptor'
import ValidationFilter from '@/filters/validation.filter'
import HttpExceptionFilter from '@/filters/http-exception.filter'
import AppModule from './app.module'
import config from './app.config'
import ValidationException from '@/exceptions/validation.exception'
const helmet = require('helmet')
const consola = require('consola')

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
        callback(null, whitelist.includes(origin))
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

  app.useGlobalInterceptors(
    new LoggerInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  )
  app.useGlobalFilters(new HttpExceptionFilter(), new ValidationFilter())
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const message = errors.map(
          (error) => `${Object.values(error.constraints).join(', ')}`,
        )
        return new ValidationException(message)
      },
    }),
  )

  app.use(compression())
  app.use(helmet())
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  )

  app.use(cookieParser())

  if (config.isProd) {
    app.use(csurf({ cookie: true }))
  }

  await app.listen(config.port)

  consola.success(`server is running on ${config.port}`)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}

bootstrap()
