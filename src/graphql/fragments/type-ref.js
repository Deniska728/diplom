import gql from 'graphql-tag';

export default gql`
  fragment TypeRef on GqlBaseType {
    kind
    name
  }
`;
