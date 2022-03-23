import { IsNotEmpty } from 'class-validator';
import { Employee } from './employee.entity';

export class CreateEmployeeDto implements Partial<Employee> {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  rank: number;
}
