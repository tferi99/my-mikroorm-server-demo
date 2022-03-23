import { EntityBase } from '../../orm/entity.base';
import {
  Collection,
  Entity,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Employee } from '../../employee/model/employee.entity';

@Entity()
export class Company extends EntityBase {
  @Property({ length: 64 })
  @Unique()
  @Property({ length: 64 })
  name: string;

  @Property()
  established: Date;
  /*
  XXXXXXXXXXXXXXXXXXXXX
   */
  //YYYYYYYYYYYYYYYYYYYYYYYYYYYY
  @Property()
  active:boolean = true;

  @Property({ length: 1024, nullable: true })
  description?: string;

  @OneToMany({
    entity: () => Employee,
    mappedBy: (employee) => employee.company,
  })
  employees: Collection<Employee>;
}
