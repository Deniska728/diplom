import gql from 'graphql-tag';

export default gql`
  fragment commentFragment on Comment {
    id
    content {
      message
    }
    createdBy {
      id
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
