import React, { useState } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';

import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Button, Form, FormGroup, Input } from 'reactstrap';

import Loading from 'components/common/Loading';

import CREATE_SCHEMA from 'graphql/mutations/schemas/createSchema';
import DELETE_SCHEMA from 'graphql/mutations/schemas/deleteSchema';
import SCHEMAS from 'graphql/queries/schemas/schemas';

import track from 'helpers/track';

const SchemasSelector = ({ user, schemas, loading }) => {
  const client = useApolloClient();
  const history = useHistory();
  const [createSchema, { loading: schemaLoading }] = useMutation(CREATE_SCHEMA);
  const [deleteSchema, { loading: deleteSchemaLoading }] = useMutation(DELETE_SCHEMA);
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

  const toggle = () => {
    if (isOpen) {
      setValues((prev) => ({
        url: prev.url,
        apiKeyName: '',
        apiKey: '',
      }));
    }
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { url, apiKeyName, apiKey } = values;

    if (user.id) {
      if (/(https:\/\/.*|http:\/\/.*)/gm.test(url)) {
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

            track({
              category: 'Create schema',
              action: 'User pressed the create schema button',
            });

            client.writeQuery({
              query: SCHEMAS,
              data: {
                schemas: [...schemas.schemas, data.createSchema],
              },
            });
            setValues({ url: '', apiKey: '', apiKeyName: '' });
          })
          .catch((err) => err.graphQLErrors.map(({ message }) => toast.error(message)));
      } else {
        toast.error('Enter a correct endpoint url');
      }
    } else {
      toast.error('To add a schema you need to log in to your account.');
    }
  };

  const handleDeleteSchema = (e, id) => {
    e.stopPropagation();

    if (id && window.confirm('Are you sure? Delete this schema?')) {
      track({
        category: 'Delete schema',
        action: 'User pressed the delete schema button',
      });

      deleteSchema({ variables: { id } })
        .then(({ data }) => {
          const schemas = client.readQuery({ query: SCHEMAS });

          client.writeQuery({
            query: SCHEMAS,
            data: {
              schemas: schemas.schemas.filter((schema) => schema.id !== data.deleteSchema.id),
            },
          });
        })
        .catch((err) => console.error(err.message));
    }
  };

  const redirectToSchemaPage = (id) => {
    history.push(`schema/${id}/comment`);
  };

  const isEmptySchemas = schemas && schemas.schemas && schemas.schemas.length;

  return (
    <div className="schemas-selector">
      <div className="schemas-list-container">
        {loading ? (
          <Loading />
        ) : (
          <div className={`schemas-list ${isEmptySchemas ? '' : ' empty'}`}>
            {isEmptySchemas
              ? schemas.schemas.map((schema) => (
                  <div
                    key={schema.id}
                    className="schema-item"
                    onClick={() => redirectToSchemaPage(schema.id)}
                  >
                    <h5 className="schema-name">{schema.name}</h5>
                    <span className="schema-url">{schema.endpointUrl}</span>
                    <Button
                      close
                      onClick={(e) => handleDeleteSchema(e, schema.id)}
                      disabled={deleteSchemaLoading}
                    />
                  </div>
                ))
              : ''}
          </div>
        )}
      </div>
      <Form className={`schemas-form${isOpen ? ' form-open' : ''}`} onSubmit={handleSubmit}>
        <FormGroup className={isOpen ? 'open' : ''}>
          <Input
            type="url"
            id="url"
            name="url"
            placeholder="https://example.com/graphql"
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
      <button onClick={toggle} className="question-btn">
        Do you have an api-key?
      </button>
    </div>
  );
};

export default SchemasSelector;
