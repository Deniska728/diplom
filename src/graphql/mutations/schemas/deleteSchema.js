import gql from 'graphql-tag';

export default gql`
  mutation deleteSchema($id: ID!) {
    deleteSchema(id: $id) {
      id
    }
  }
`;
