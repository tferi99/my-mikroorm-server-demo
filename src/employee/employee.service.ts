import { Injectable } from '@nestjs/common';
import { Employee } from './model/employee.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  EntityManager,
  EntityRepository,
  FilterQuery,
  QueryOrder,
  wrap,
} from '@mikro-orm/core';
import { CreateEmployeeDto } from './model/create-employee-dto';
import { OrmService } from '../orm/orm.service';
import { UpdateEmployeeDto } from './model/update-employee-dto';
import { GetAllOptions } from '../orm/get-all-options';

@Injectable()
export class EmployeeService {
  @InjectRepository(Employee)
  private repo: EntityRepository<Employee>;

  constructor(private em: EntityManager, private ormService: OrmService) {}

  async getAll(opts?: GetAllOptions<Employee>): Promise<Employee[]> {
    if (!opts) {
      opts = {
        filter: {},
      };
    }
    opts.options.orderBy = { id: QueryOrder.ASC };
    const ret = this.repo.find(opts.filter, opts.options);
    this.ormService.dumpUnitOfWork();
    return ret;
  }

  async get(where?: FilterQuery<Employee>): Promise<Employee> {
    return this.repo.findOne(where);
  }

  async create(dto: CreateEmployeeDto): Promise<Employee> {
    const obj = new Employee();
    wrap(obj).assign(dto, { em: this.em });
    await this.repo.persistAndFlush(obj);
    return obj;
  }

  async update(
    filter: number | FilterQuery<Employee>,
    data: UpdateEmployeeDto,
  ): Promise<number> {
    if (typeof filter === 'number') {
      filter = { id: filter };
    }
    delete data.id; // we don't want to update 'id'
    return this.repo.nativeUpdate(filter, data);
  }

  async delete(filter: number | FilterQuery<Employee>): Promise<number> {
    if (typeof filter === 'number') {
      filter = { id: filter };
    }
    return this.repo.nativeDelete(filter);
  }
}
