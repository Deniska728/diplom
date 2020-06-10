import gql from 'graphql-tag';

export default gql`
  query me {
    me {
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
  }
`;
