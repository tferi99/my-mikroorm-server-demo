import { Module } from '@nestjs/common';
import { DivisionService } from './division.service';
import { DivisionController } from './division.controller';
import { OrmModule } from '../orm/orm.module';

@Module({
  imports: [OrmModule],
  providers: [DivisionService],
  controllers: [DivisionController],
  exports: [DivisionService],
})
export class DivisionModule {}
