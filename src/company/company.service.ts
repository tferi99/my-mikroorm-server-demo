import { Injectable } from '@nestjs/common';
import { Company } from './model/company.entity';
import { CrudServiceBase } from '../orm/crud-service-base';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

@Injectable()
export class CompanyService extends CrudServiceBase<Company> {
  @InjectRepository(Company)
  private repo: EntityRepository<Company>;

  getEntityRepository(): EntityRepository<Company> {
    return this.repo;
  }

  newEntity(): Company {
    return new Company();
  }
}
