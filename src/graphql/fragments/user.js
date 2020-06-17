import gql from 'graphql-tag';

export default gql`
  fragment userFragment on User {
    id
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
