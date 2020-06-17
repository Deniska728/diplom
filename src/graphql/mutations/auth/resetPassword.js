import gql from 'graphql-tag';

export default gql`
  mutation resetPassword($email: String!) {
    resetPassword(email: $email)
  }
`;
