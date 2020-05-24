import gql from 'graphql-tag';

export default gql`
  mutation createSchema($apiKeyName: String, $apiKey: String, $endpoint: String!) {
    createSchema(apiKeyName: $apiKeyName, apiKey: $apiKey, endpoint: $endpoint) {
      id
      name
      apiKey
      endpointUrl
    }
  }
`;
