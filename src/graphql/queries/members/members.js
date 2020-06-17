import gql from 'graphql-tag';

import userFragment from '../../fragments/user';

export default gql`
  query schemaQuery($id: ID!, $apiKey: String) {
    schema(id: $id, apiKey: $apiKey) {
      id
      owner {
        id
      }
      members {
        ...userFragment
      }
    }
  }
  ${userFragment}
`;
