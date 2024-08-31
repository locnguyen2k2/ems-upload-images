import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphqlOptions } from './graphq.options';

@Module({
  imports: [
    NestGraphQLModule.forRootAsync({
      useClass: GraphqlOptions,
      driver: ApolloDriver,
    }),
  ],
})
export class GraphQLModule {}
