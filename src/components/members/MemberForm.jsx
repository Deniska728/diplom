import React, { useState } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';

import { toast } from 'react-toastify';

import { Form, Input, Button } from 'reactstrap';

import MEMBERS from 'graphql/queries/members/members';
import ADD_MEMBER from 'graphql/mutations/members/addMember';

const MemberForm = ({ schemaId }) => {
  const [value, setValue] = useState('');
  const client = useApolloClient();
  const [addSchemaMember, { loading }] = useMutation(ADD_MEMBER);

  const handleChange = ({ target: { value } }) => {
    setValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value) {
      const variables = {
        schemaId,
        email: value,
      };

      addSchemaMember({ variables })
        .then(({ data }) => {
          const variables = {
            id: schemaId,
          };

          const membersQuery = client.readQuery({
            query: MEMBERS,
            variables,
          });

          client.writeQuery({
            query: MEMBERS,
            variables,
            data: {
              schema: {
                ...membersQuery.schema,
                members: data.addSchemaMember,
              },
            },
          });

          setValue('');
        })
        .catch((err) => toast.error(err.message));
    } else {
      alert('Enter e-mail');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="member-form">
      <Input
        type="email"
        placeholder="E-mail"
        onChange={handleChange}
        value={value}
        className="email-input"
      />
      <Button color="primary" disabled={loading} className="member-form-btn">
        Add member
      </Button>
    </Form>
  );
};

export default MemberForm;
