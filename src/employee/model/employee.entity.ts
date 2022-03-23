import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { EntityBase } from '../../orm/entity.base';
import { Company } from '../../company/model/company.entity';
import { Note } from '../../note/model/note.entity';
import { Division } from '../../division/model/division.entity';
import { EmployeeType } from '../../global/global-types';

@Entity()
export class Employee extends EntityBase {
  @Property({ length: 64 })
  name: string;

  @Property({ length: 256 })
  email: string;

  @Property({ nullable: true })
  birth?: Date;

  @Enum({ items: () => EmployeeType })
  type: EmployeeType = EmployeeType.WORKER;

  @Property()
  rank: number = 0;

  @Property()
  active: boolean = true;

  @ManyToOne({
    entity: () => Company,
    inversedBy: (company) => company.employees,
    nullable: true,
  })
  company?: Company;

  @ManyToMany(() => Division)
  divisions: Collection<Division> = new Collection<Division>(this);

  @OneToMany({
    entity: () => Note,
    mappedBy: (note) => note.employee,
    orphanRemoval: true,
  })
  notes: Collection<Note>;
}
