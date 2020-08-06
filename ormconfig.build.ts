import configService from './src/app.config'
import fs = require('fs')

fs.writeFileSync(
  'ormconfig.json',
  JSON.stringify(configService.ormconfig, null, 2),
)
