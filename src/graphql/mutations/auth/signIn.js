import gql from 'graphql-tag';

import userFragment from '../../fragments/user';

export default gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      user {
        ...userFragment
      }
      token
    }
  }

  ${userFragment}
`;
