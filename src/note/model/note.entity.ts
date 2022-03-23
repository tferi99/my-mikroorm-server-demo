import { EntityBase } from '../../orm/entity.base';
import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Employee } from '../../employee/model/employee.entity';

@Entity()
export class Note extends EntityBase {
  @Property({ length: 1024 })
  content: string;

  @ManyToOne({
    entity: () => Employee,
    inversedBy: (employee) => employee.notes,
  })
  employee: Employee;
}
