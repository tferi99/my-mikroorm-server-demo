import { EntityBase } from '../../orm/entity.base';
import { Company } from '../../company/model/company.entity';
import { Employee } from '../../employee/model/employee.entity';
import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property,
} from '@mikro-orm/core';

@Entity()
export class Division extends EntityBase {
  @Property({ length: 64 })
  name: string;

  @Property({ length: 1024, nullable: true })
  description?: string;

  @ManyToOne({ entity: () => Company })
  company: Company;

  @ManyToMany(() => Employee, (emp) => emp.divisions)
  employees: Collection<Employee> = new Collection<Employee>(this);
}
