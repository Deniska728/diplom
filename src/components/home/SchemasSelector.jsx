import React, { useState } from 'react';

import { Button, Form, FormGroup, Input } from 'reactstrap';

const SchemasSelector = ({ schemas, loading }) => {
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

  const isEmptySchemas = schemas && schemas.schemas && schemas.schemas.length;

  return (
    <div className="schemas-selector">
      <div className="schemas-list-container">
        {loading ? (
          <div>Loading...</div>
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
      <Form className={`schemas-form${isOpen ? ' form-open' : ''}`}>
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
                name="apikey"
                placeholder="Enter api-key"
                bsSize="lg"
                value={values.apiKey}
                onChange={handleChange}
              />
            </React.Fragment>
          )}
          <Button type="submit" color="primary" size="lg" disabled={loading}>
            Submit
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
