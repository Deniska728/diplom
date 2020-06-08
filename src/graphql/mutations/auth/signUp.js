import gql from 'graphql-tag';

import userFragment from '../../fragments/user';

export default gql`
  mutation signUp($email: String!, $password: String!, $username: String!) {
    signUp(email: $email, password: $password, username: $username) {
      user {
        ...userFragment
      }
      token
    }
  }

  ${userFragment}
`;
