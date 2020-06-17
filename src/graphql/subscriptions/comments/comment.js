import gql from 'graphql-tag';

import commentFragment from '../../fragments/comment';

export default gql`
  subscription commentSubscription($schemaId: ID!, $id: ID!) {
    comment(schemaId: $schemaId, id: $id) {
      mutation
      comment {
        ...commentFragment
      }
      previousValues {
        id
      }
    }
  }

  ${commentFragment}
`;
