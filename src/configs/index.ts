import {
  FirebaseConfig,
  firebaseKey,
  IFirebaseConfig,
} from './firebase/firebase.config';
import {
  GraphqlConfig,
  graphqlKey,
  IGraphqlConfig,
} from './graphql/graphql.config';

export * from './graphql/graphql.config';
export * from './firebase/firebase.config';

export interface AllConfigType {
  [firebaseKey]: IFirebaseConfig;
  [graphqlKey]: IGraphqlConfig;
}

export type ConfigKeyPaths = RecordNamePaths<AllConfigType>;

export default {
  FirebaseConfig,
  GraphqlConfig,
};
