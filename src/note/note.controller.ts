import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FilterQuery } from '@mikro-orm/core';
import { NoteService } from './note.service';
import { Note } from './model/note.entity';
import { CreateNoteDto } from './model/create-note-dto';

@Controller('note')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Get()
  async getAll(filter?: FilterQuery<Note>) {
    return this.noteService.getAll({ filter });
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: CreateNoteDto): Promise<Note> {
    return this.noteService.create(dto);
  }
}
