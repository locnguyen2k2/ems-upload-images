import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ImageModule } from './modules/images/image.module';
import config from './configs/index';
import { GraphQLModule } from './configs/graphql/graphql.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: ['.env'],
      load: [...Object.values(config)],
    }),
    GraphQLModule,
    ImageModule,
  ],
})
export class AppModule {}
