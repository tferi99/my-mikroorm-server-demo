import { Injectable } from '@nestjs/common';
import {
  EntityManager,
  EntityRepository,
  FilterQuery,
  wrap,
} from '@mikro-orm/core';
import { EntityBase } from './entity.base';
import { GetAllOptions } from './get-all-options';

@Injectable()
export abstract class CrudServiceBase<T extends EntityBase> {
  abstract getEntityRepository(): EntityRepository<T>;
  abstract newEntity(): T;

  constructor(private em: EntityManager) {}

  async getAll(opts?: GetAllOptions<T>): Promise<T[]> {
    if (!opts) {
      opts = { filter: {} };
    }
    const ret = this.getEntityRepository().find(opts.filter, opts.options);
    return ret;
  }

  async get(where?: FilterQuery<T>): Promise<T> {
    return this.getEntityRepository().findOne(where);
  }

  async create(dto: Partial<T>): Promise<T> {
    const obj = this.newEntity();
    wrap(obj).assign(dto, { em: this.em });
    await this.getEntityRepository().persistAndFlush(obj);
    return obj;
  }

  async createAll(dtos: Partial<T>[]): Promise<void> {
    const objs: T[] = [];
    for (const dto of dtos) {
      const obj = this.newEntity();
      wrap(obj).assign(dto, { em: this.em });
      objs.push(obj);
    }
    await this.getEntityRepository().persistAndFlush(objs);
  }

  async update(filter: FilterQuery<T>, dto: Partial<T>): Promise<number> {
    return this.getEntityRepository().nativeUpdate(filter, dto);
  }

  async delete(filter: FilterQuery<T>): Promise<number> {
    return this.getEntityRepository().nativeDelete(filter);
  }
}
