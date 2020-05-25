import gql from 'graphql-tag';

export default gql`
  fragment userFragment on User {
    id
    sub
    email
    username
    profile {
      firstName
      lastName
      fullName
      picture
    }
  }
`;
