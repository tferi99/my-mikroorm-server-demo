import { Injectable } from '@nestjs/common';
import { CrudServiceBase } from '../orm/crud-service-base';
import { Division } from './model/division.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

@Injectable()
export class DivisionService extends CrudServiceBase<Division> {
  @InjectRepository(Division)
  private repo: EntityRepository<Division>;

  getEntityRepository(): EntityRepository<Division> {
    return this.repo;
  }

  newEntity(): Division {
    return new Division();
  }
}
