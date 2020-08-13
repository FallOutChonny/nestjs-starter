import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'

const NODE_ENV = process.env.NODE_ENV
if (!NODE_ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.',
  )
}

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const dotenvFiles = [
  `.env.${NODE_ENV}.local`,
  // Don't include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  NODE_ENV !== 'test' && `.env.local`,
  `.env.${NODE_ENV}`,
  '.env',
].filter(Boolean)

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.  Variable expansion is supported in .env files.
// https://github.com/motdotla/dotenv
// https://github.com/motdotla/dotenv-expand
dotenvFiles.forEach((dotenvFile) => {
  if (fs.existsSync(path.resolve(process.cwd(), dotenvFile))) {
    require('dotenv-expand')(
      dotenv.config({
        path: path.resolve(process.cwd(), dotenvFile),
      }),
    )
  }
})

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key]
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`)
    }

    return value
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true))
    return this
  }

  public get(key: string) {
    return this.env[key]
  }

  public get port() {
    return this.getValue('PORT', false) || 3000
  }

  public get isDev() {
    return this.getValue('NODE_ENV') === 'development'
  }

  public get isProd() {
    return !this.isDev
  }

  public get ormconfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USERNAME'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),
      keepConnectionAlive: true,
      entities: ['src/**/*.entity.{ts,js}'],
      migrationsTableName: 'migration',
      migrations: ['db/migrations/*.ts'],
      cli: {
        migrationsDir: 'db/migrations',
      },
      logging: true,
      ssl: this.isProd,
    }
  }
}

export default new ConfigService(process.env)
