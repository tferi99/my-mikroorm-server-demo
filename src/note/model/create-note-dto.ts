import { IsNotEmpty } from 'class-validator';
import { Note } from './note.entity';

export class CreateNoteDto implements Partial<Note> {
  @IsNotEmpty()
  content: string;

  employeeId: number;
}
