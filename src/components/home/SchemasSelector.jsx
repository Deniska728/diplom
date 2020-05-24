import React, { useState } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';

import { Button, Form, FormGroup, Input } from 'reactstrap';

import CREATE_SCHEMA from 'graphql/mutations/schemas/createSchema';
import SCHEMAS from 'graphql/queries/schemas/schemas';
import Loading from '../common/Loading';

const SchemasSelector = ({ user, runAuthLock, schemas, loading }) => {
  const client = useApolloClient();
  const [createSchema, { loading: schemaLoading }] = useMutation(CREATE_SCHEMA);
  const [values, setValues] = useState({
    url: '',
    apiKeyName: '',
    apiKey: '',
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { url, apiKeyName, apiKey } = values;

    if (user) {
      if (url) {
        const variables = {
          endpoint: url,
        };

        if (apiKeyName && apiKey) {
          variables.apiKeyName = apiKeyName;
          variables.apiKey = apiKey;
        }

        createSchema({ variables })
          .then(({ data }) => {
            const schemas = client.readQuery({ query: SCHEMAS });

            client.writeQuery({
              query: SCHEMAS,
              data: {
                schemas: [...schemas.schemas, data.createSchema],
              },
            });
            setValues({ url: '', apiKey: '', apiKeyName: '' });
          })
          .catch((err) => console.error(err.message));
      } else {
        window.alert('Enter endpoint url');
      }
    } else {
      runAuthLock();
    }
  };

  const isEmptySchemas = schemas && schemas.schemas && schemas.schemas.length;

  return (
    <div className="schemas-selector">
      <div className="schemas-list-container">
        {loading ? (
          <Loading />
        ) : (
          <div className={`schemas-list ${isEmptySchemas ? '' : ' empty'}`}>
            {isEmptySchemas &&
              schemas.schemas.map((schema) => (
                <div key={schema.id} className="schema-item" onClick={() => console.log(schema.id)}>
                  <h5 className="schema-name">{schema.name}</h5>
                  {schema.latestVersion && (
                    <span className="schema-url">{schema.latestVersion.endpointUrl}</span>
                  )}
                  <Button close onClick={() => console.log(schema.id)} />
                </div>
              ))}
          </div>
        )}
      </div>
      <Form className={`schemas-form${isOpen ? ' form-open' : ''}`} onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            type="url"
            id="url"
            name="url"
            placeholder="https://example.com/graphql"
            pattern="(https://.*|http://.*)"
            bsSize="lg"
            size="50"
            required
            value={values.url}
            onChange={handleChange}
          />
          {isOpen && (
            <React.Fragment>
              <Input
                type="text"
                id="apiKeyName"
                name="apiKeyName"
                placeholder="Enter api-key name"
                bsSize="lg"
                value={values.apiKeyName}
                onChange={handleChange}
              />
              <Input
                type="text"
                id="apiKey"
                name="apiKey"
                placeholder="Enter api-key"
                bsSize="lg"
                value={values.apiKey}
                onChange={handleChange}
              />
            </React.Fragment>
          )}
          <Button type="submit" color="primary" size="lg" disabled={schemaLoading}>
            {schemaLoading ? <Loading invert /> : 'Submit'}
          </Button>
        </FormGroup>
      </Form>
      <button onClick={() => setIsOpen(!isOpen)} className="question-btn">
        Do you have an api-key?
      </button>
    </div>
  );
};

export default SchemasSelector;
