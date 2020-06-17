import gql from 'graphql-tag';

export default gql`
  mutation removeSchemaMember($schemaId: ID!, $userId: ID!) {
    removeSchemaMember(schemaId: $schemaId, userId: $userId)
  }
`;
