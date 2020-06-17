import gql from 'graphql-tag';

import schemaFragment from '../../fragments/schema';

export default gql`
  query schemaQuery($id: ID!, $apiKey: String) {
    schema(id: $id, apiKey: $apiKey) {
      ...schemaFragment
    }
  }
  ${schemaFragment}
`;
