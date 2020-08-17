## Description

這個 starter 已經完成專案的基礎設施例如安全性、日誌、熱更新等等，且實作了角色、使用者管理以及權限管控的相關 API，可以跳過瑣碎的步驟直接開始開發功能

包含功能

* webpack - 開發環境使用，實現熱更新和快取
* typeorm - 資料庫對應工具
* postgres - 資料庫
* nestjs
* class-validator - 驗證前端傳來的 DTO 物件
* swagger - API 線上說明文件
* passport-jwt - 身分認證
* helemt, csurf, rate-limit - 提升安全性

## Development

### Install packages

```bash
$ yarn install
```

### Database

postgres 的環境已經用 docker 包起來了，所以要先到官網下載和安裝 docker，安裝後也要記得把 docker 打開

這個步驟做完就可以輸入下面兩個指令啟動/停止資料庫

```bash
# start
$ yarn run start:db

# stop
$ yarn run stop:db
```

初次使用時要先執行一次 `$ yarn run migration:run` 產生 DB 會用到的資料表

再來因為使用 typeorm 做資料庫對應，所以還要建立 ormconfig.json 來設置 DB 連接資訊

```bash
$ yarn run build:ormconfig
```

NOTE: 當 `src/app.config.ts` 的 TypeOrmConfig 設定有異動時，也要記得重新產生新的 ormconfig.json

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

### 執行

```bash
# development
$ yarn run start

# hot-reload mode
$ yarn run start:dev
```

啟動後可在 http://localhost:3000/api/v1 看到 swagger，也可點每個api右上角的 `try it out` 按鈕進行測試

### 正式環境打包

```bash
# bundle code on production mode
$ yarn run build

# run production mode
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
