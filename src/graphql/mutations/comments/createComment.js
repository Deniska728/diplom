import gql from 'graphql-tag';

import commentFragment from '../../fragments/comment';

export default gql`
  mutation createComment($schemaId: ID!, $gqlTypeId: ID, $gqlFieldId: ID, $content: String!) {
    createComment(
      schemaId: $schemaId
      gqlTypeId: $gqlTypeId
      gqlFieldId: $gqlFieldId
      content: $content
    ) {
      ...commentFragment
    }
  }

  ${commentFragment}
`;
