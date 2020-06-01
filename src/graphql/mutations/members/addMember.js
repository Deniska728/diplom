import gql from 'graphql-tag';

import userFragment from '../../fragments/user';

export default gql`
  mutation addSchemaMember($schemaId: ID!, $email: String!) {
    addSchemaMember(schemaId: $schemaId, email: $email) {
      ...userFragment
    }
  }

  ${userFragment}
`;
