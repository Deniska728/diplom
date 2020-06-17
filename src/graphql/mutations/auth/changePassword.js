import gql from 'graphql-tag';

export default gql`
  mutation changePassword($token: String, $oldPassword: String, $password: String!) {
    changePassword(token: $token, password: $password, oldPassword: $oldPassword) {
      id
    }
  }
`;
