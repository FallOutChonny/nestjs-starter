import configService from './src/app.config'
import fs = require('fs')

fs.writeFileSync(
  'ormconfig.json',
  JSON.stringify(
    [
      configService.ormconfig,
      {
        ...configService.ormconfig,
        name: 'seed',
        migrations: ['db/seeds/*.ts'],
        cli: {
          migrationsDir: 'db/seeds',
        },
      },
    ],
    null,
    2,
  ),
)
