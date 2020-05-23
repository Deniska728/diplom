import gql from 'graphql-tag';

export default gql`
  query me {
    me {
      id
      profile {
        fullName
        picture
      }
    }
  }
`;
