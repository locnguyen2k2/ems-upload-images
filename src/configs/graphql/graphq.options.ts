import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';
import { ConfigKeyPaths } from '../index';
import { IGraphqlConfig } from './graphql.config';
import { cwd } from '../../utils/env';
import { ApolloDriverConfig } from '@nestjs/apollo';

const configService = new ConfigService<ConfigKeyPaths>();

@Injectable()
export class GraphqlOptions implements GqlOptionsFactory {
  public createGqlOptions(): Promise<ApolloDriverConfig> | ApolloDriverConfig {
    return {
      ...configService.get<IGraphqlConfig>('graphql'),
      autoSchemaFile: `${cwd}/src/schema.graphql`,
      context: ({ req, res, connection }) =>
        connection
          ? { req: { headers: connection.context }, res }
          : { req, res },
      formatError: (error: any) => {
        error.message = error.extensions.originalError
          ? error.extensions.originalError['message']
          : error.message;
        return { message: error.message, locations: error.locations };
      },
    };
  }
}
