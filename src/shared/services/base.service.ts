import { Injectable } from '@nestjs/common'
import {
  Repository,
  ObjectLiteral,
  FindManyOptions,
  FindOneOptions,
} from 'typeorm'

@Injectable()
export default class BaseRepostory<T extends ObjectLiteral> {
  protected _model: Repository<T>

  async findAll(options: FindManyOptions<T> = {}): Promise<T[]> {
    return this._model.find(options)
  }

  async findOne(options: FindOneOptions = {}): Promise<T> {
    return this._model.findOne(options)
  }

  async findById(id: number): Promise<T> {
    return this._model.findOne(id)
  }

  async create(item: Partial<T>): Promise<T> {
    return this._model.create(item)
  }

  async update(item: Partial<T>): Promise<T> {
    await this._model.update(item.id, item)

    return this.findById(item.id)
  }

  async delete(id: number) {
    return this._model.delete(id)
  }

  async entityFromSql<TResult>(
    storeProcedureName: string,
    params: any[],
  ): Promise<TResult> {
    return this._model.query(storeProcedureName, params)
  }

  async createOrUpdate(item: Partial<T>): Promise<T> {
    if (!this._model.findOne(item.id)) {
      return this.create(item)
    }

    return this.update(item)
  }
}
