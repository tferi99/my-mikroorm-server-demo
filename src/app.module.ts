import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { OrmModule } from './orm/orm.module';
import { CompanyModule } from './company/company.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './global/global-exception-filter';
import { DivisionModule } from './division/division.module';
import { NoteModule } from './note/note.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    OrmModule,
    EmployeeModule,
    CompanyModule,
    DivisionModule,
    NoteModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
