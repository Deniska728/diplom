import gql from 'graphql-tag';

import commentFragment from '../../fragments/comment';

export default gql`
  query commentsQuery($schemaId: ID!, $id: ID!) {
    comments(id: $id, schemaId: $schemaId) {
      ...commentFragment
    }
  }

  ${commentFragment}
`;
