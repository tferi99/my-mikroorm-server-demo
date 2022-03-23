import { Injectable, Logger } from '@nestjs/common';
import { CompanyService } from './company/company.service';
import { Timeout } from '@nestjs/schedule';
import { Company } from './company/model/company.entity';
import { Division } from './division/model/division.entity';
import { EmployeeService } from './employee/employee.service';
import { NoteService } from './note/note.service';
import { DivisionService } from './division/division.service';
import { Employee } from './employee/model/employee.entity';
import { EmployeeType } from './global/global-types';

const dayMs = 3600 * 1000 * 24;

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private companyService: CompanyService,
    private divisionService: DivisionService,
    private employeeService: EmployeeService,
    private noteService: NoteService,
  ) {}

  getHello(): string {
    return '<<< My NestJS MikroORM Demo >>>';
  }

  @Timeout(500)
  async initApplication() {
    this.logger.log('### APP INIT');
    this.initDbContent();
  }

  async initDbContent() {
    const companies = await this.companyService.getAll();
    if (companies.length > 0) {
      return; // inited
    }

    this.logger.warn(
      '===================== Initialization of DB content =====================',
    );
    const now = new Date().getTime();
    // ----------------------------------------- company ----------------------------------------------------
    const company: Partial<Company> = {
      name: 'Abc Inc.',
      description: 'This is my first company.',
      active: true,
      established: new Date(now - dayMs * 1000),
    };
    const c = await this.companyService.create(company);
    console.log('Company created:', c);

    // ----------------------------------------- division ----------------------------------------------------
    const d1: Partial<Division> = {
      company: c,
      name: 'Development',
      description: 'This is the main division.',
    };
    const div1 = await this.divisionService.create(d1);

    const d2: Partial<Division> = {
      company: c,
      name: 'HR',
      description: 'This is an auxiliary division.',
    };
    const div2 = await this.divisionService.create(d2);

    // ----------------------------------------- employee ----------------------------------------------------
    const e1 = new Employee();
    e1.name = 'John Smith';
    e1.email = 'js@test.com';
    e1.rank = 1;
    e1.type = EmployeeType.MANAGER;
    e1.birth = new Date(now - dayMs * 2000);
    e1.divisions.add(div1, div2);
    await this.employeeService.create(e1);

    const e2 = new Employee();
    e2.name = 'Jane Doe';
    e2.email = 'jd@test.com';
    e2.rank = 5;
    e2.type = EmployeeType.WORKER;
    e2.birth = new Date(now - dayMs * 1000);
    e2.company = c;
    e2.divisions.add(div2);
    await this.employeeService.create(e2);
  }

  // ----------------------------------------- employee ----------------------------------------------------
}
