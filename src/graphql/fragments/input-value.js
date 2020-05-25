import gql from 'graphql-tag';
import typeRef from './type-ref';

export default gql`
  fragment InputValue on GqlInputValue {
    name
    description
    typeName
    kinds
    defaultValue
  }
  ${typeRef}
`;
