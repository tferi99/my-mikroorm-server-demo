import { IsNotEmpty } from 'class-validator';
import { Employee } from './employee.entity';

/**
 * It can be empty.
 * You just have to add fields which you want to access directly.
 */
export class UpdateEmployeeDto implements Partial<Employee> {
  @IsNotEmpty()
  id: number; // we delete it in update
}
