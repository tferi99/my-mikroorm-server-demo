import { IsNotEmpty } from 'class-validator';
import { Company } from './company.entity';

export class CreateCompanyDto implements Partial<Company> {
  @IsNotEmpty()
  name: string;

  established: Date;
}
