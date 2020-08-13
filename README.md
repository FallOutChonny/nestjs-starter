## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Development

### Install packages

```bash
$ yarn install
```

### Database

postgres 的環境已經用 docker 包起來了，所以要先下載 docker 並安裝

再來因為使用 typeorm 做 ORM，所以還要建立 ormconfig.json 來設置 DB 連接資訊

```bash
$ yarn run build:ormconfig
```

這兩個步驟做完就可以輸入下面兩個指令啟動/停止資料庫

```bash
# start
$ yarn run start:db

# stop
$ yarn run stop:db
```

初次使用時要先執行一次 `migration:run` 產生會用到的資料表

### DB migrations

DB migration 主要用來產生、異動或刪除 Table，檔案都放在 db/migrations 資料夾下

```bash
# 建立一個 migration 檔案
$ yarn run migration:create <fileName>

# 執行所有的 migrations
$ yarn run migration:run

# 還原所有資料庫的 migrations
$ yarn run migration:revert
```

### DB seeds

DB seed 主要用來產生測試資料並寫入 DB，檔案都放在 db/seeds 資料夾下

```bash
# 建立一個 seed 檔案
$ yarn run seed:create <fileName>

# 執行 seed
$ yarn run seed:run

# 還原資料
$ yarn run seed:revert
```

### Running the app

```bash
# development
$ yarn run start

# hot-reload mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
