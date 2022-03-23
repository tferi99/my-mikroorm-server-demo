import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Employee } from './model/employee.entity';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './model/create-employee-dto';
import { UpdateEmployeeDto } from './model/update-employee-dto';
import { FilterQuery, Populate } from '@mikro-orm/core';
import { Company } from '../company/model/company.entity';
import { GetAllOptions } from '../orm/get-all-options';

@Controller('employee')
export class EmployeeController {
  private idx = 0;

  constructor(private employeeService: EmployeeService) {}

  @Get()
  async getAll(
    @Query('populated', ParseBoolPipe) populated = false,
    filter?: FilterQuery<Employee>,
  ) {
    //const populate: Populate<Employee> = populated ? {notes: {employee: false}} : null;
    const populate: Populate<Employee> = populated ? ['notes'] : null;
    const opts: GetAllOptions<Employee> = {
      filter,
      options: {
        populate,
      },
    };
    return this.employeeService.getAll(opts);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: CreateEmployeeDto): Promise<Employee> {
    dto.name = dto.name + ' ' + this.idx;
    dto.rank = this.idx++;
    return this.employeeService.create(dto);
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateEmployeeDto,
  ): Promise<number> {
    return this.employeeService.update(id, data);
    //return this.employeeService.update({id: {$gte: 5}}, data);
    //return this.employeeService.update({id: 500, email: 'a@b.c'}, data);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.employeeService.delete(id);
    //return this.employeeService.delete({id: {$gte: id}});
  }
}
