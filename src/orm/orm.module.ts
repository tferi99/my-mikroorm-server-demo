import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MIKRO_ORM_OPTIONS } from './mikro-orm-options';
import { OrmService } from './orm.service';
import { ENTITIES } from './entities';

@Module({
  imports: [
    MikroOrmModule.forRoot(MIKRO_ORM_OPTIONS),
    MikroOrmModule.forFeature(ENTITIES),
  ],
  providers: [OrmService],
  exports: [MikroOrmModule, OrmService],
})
export class OrmModule {}
