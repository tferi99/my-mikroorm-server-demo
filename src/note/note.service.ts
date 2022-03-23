import { Injectable } from '@nestjs/common';
import { CrudServiceBase } from '../orm/crud-service-base';
import { Note } from './model/note.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Company } from '../company/model/company.entity';
import { EntityRepository } from '@mikro-orm/core';

@Injectable()
export class NoteService extends CrudServiceBase<Note> {
  @InjectRepository(Note)
  private repo: EntityRepository<Note>;

  getEntityRepository(): EntityRepository<Note> {
    return this.repo;
  }

  newEntity(): Note {
    return new Note();
  }
}
