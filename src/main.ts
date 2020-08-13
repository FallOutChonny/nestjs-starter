import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as csurf from 'csurf'
import * as helmet from 'helmet'
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'
import * as compression from 'compression'
import * as rateLimit from 'express-rate-limit'
import LoggerInterceptor from '@/interceptors/logger.interceptor'
import AppModule from './app.module'
import config from './app.config'
const consola = require('consola')

declare const module: any

const whitelist = [
  'http://127.0.0.1:3000', // dev
  'http://localhost:3000', // dev
]

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
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
    logger: consola,
  })

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

  if (process.env.NODE_ENV === 'production') {
    app.use(
      session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
      }),
    )

    app.use(csurf({ cookie: true }))
  }

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(config.port)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}

bootstrap()
