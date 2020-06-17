import gql from 'graphql-tag';
import userFragment from './user';
import FullType from './full-type';
import TypeArgument from './type-argument';

export default gql`
  fragment schemaFragment on Schema {
    id
    name
    apiKey
    owner {
      ...userFragment
    }
    members {
      ...userFragment
    }
    introspectionSchema {
      types {
        ...FullType
      }
      directives {
        name
        description
        locations
        args {
          ...TypeArgument
        }
      }
    }
    endpointUrl
  }
  ${userFragment}
  ${FullType}
  ${TypeArgument}
`;
