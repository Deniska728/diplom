import gql from 'graphql-tag';

export default gql`
  query schemas {
    schemas {
      id
      name
      apiKey
      endpointUrl
    }
  }
`;
