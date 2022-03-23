import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from './model/company.entity';
import { CreateCompanyDto } from './model/create-company-dto';
import { LoadStrategy, Populate } from '@mikro-orm/core';
import { GetAllOptions } from '../orm/get-all-options';
import { YEAR_MSECS } from '../global/global-params';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get()
  async getAll(
    @Query('populated', ParseBoolPipe) populated = false,
  ): Promise<Company[]> {
    //const populate: Populate<Company> = populated ? {employees: {company: true}} : null;
    const populate: Populate<Company> = populated ? ['employees'] : null;
    const opts: GetAllOptions<Company> = {
      options: {
        populate,
        strategy: LoadStrategy.JOINED,
      },
    };
    return this.companyService.getAll(opts);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: CreateCompanyDto): Promise<Company> {
    dto.established = new Date(new Date().getTime() - 10 * YEAR_MSECS);
    return this.companyService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.companyService.delete({ id });
  }
}
