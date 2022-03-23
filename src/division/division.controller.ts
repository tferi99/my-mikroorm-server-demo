import { Controller, Get, Query } from '@nestjs/common';
import { DivisionService } from './division.service';
import { Division } from './model/division.entity';

@Controller('division')
export class DivisionController {
  constructor(
    private divisionService: DivisionService
  ) {}

  @Get()
  async getAll(): Promise<Division[]> {
    return this.divisionService.getAll();
  }
}
