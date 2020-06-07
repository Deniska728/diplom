import gql from 'graphql-tag';

export default gql`
  fragment commentFragment on Comment {
    id
    content {
      message
    }
    createdBy {
      username
      profile {
        firstName
        fullName
        picture
      }
    }
    createdAt
  }
`;
