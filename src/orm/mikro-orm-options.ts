import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs/typings';
import { UnderscoreNamingStrategy } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { logger } from '@mikro-orm/nestjs';
import { ENTITIES } from './entities';

export const MIKRO_ORM_OPTIONS: MikroOrmModuleSyncOptions = {
  type: 'postgresql',
  dbName: 'mymikroormserverdemo',
  entities: ENTITIES,
  //  metadataProvider: TsMorphMetadataProvider,
  namingStrategy: UnderscoreNamingStrategy,
  highlighter: new SqlHighlighter(),
  debug: true,
  logger: logger.log.bind(logger),
  discovery: {
    disableDynamicFileAccess: true, // required for Webpack - it forces ReflectMetadataProvider!
  },
  //loadStrategy: LoadStrategy.JOINED
};
