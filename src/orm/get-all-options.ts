import { EntityBase } from './entity.base';
import { FilterQuery, FindOptions } from '@mikro-orm/core';

export interface GetAllOptions<T extends EntityBase> {
  filter?: FilterQuery<T>;
  options?: FindOptions<T>;
}
