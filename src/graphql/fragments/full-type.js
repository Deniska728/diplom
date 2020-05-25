import gql from 'graphql-tag';
import typeRef from './type-ref';
import typeArgument from './type-argument';
import inputValue from './input-value';

export default gql`
  fragment FullType on GqlType {
    id
    kind
    name
    description
    fields {
      id
      name
      kinds
      description
      args {
        ...TypeArgument
      }
      typeName
      isDeprecated
      deprecationReason
    }
    inputFields {
      ...InputValue
    }
    interfaces {
      ...TypeRef
    }
    enumValues {
      id
      name
      description
    }
    possibleTypes {
      ...TypeRef
    }
  }
  ${typeArgument}
  ${typeRef}
  ${inputValue}
`;
