import gql from 'graphql-tag';

import userFragment from '../../fragments/user';

export default gql`
  mutation updateUser(
    $username: String
    $email: String
    $firstName: String
    $lastName: String
    $picture: String
  ) {
    updateUser(
      username: $username
      email: $email
      firstName: $firstName
      lastName: $lastName
      picture: $picture
    ) {
      ...userFragment
    }
  }

  ${userFragment}
`;
