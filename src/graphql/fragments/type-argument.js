import gql from 'graphql-tag';
import TypeRef from './type-ref';

export default gql`
  fragment TypeArgument on GqlInputValue {
    name
    description
    kinds
    typeName
    defaultValue
  }
  ${TypeRef}
`;
