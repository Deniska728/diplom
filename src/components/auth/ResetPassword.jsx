import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';

import { Button, Form, FormGroup, Input, Label, FormText } from 'reactstrap';

import Loading from 'components/common/Loading';

import RESET from 'graphql/mutations/auth/resetPassword';

const ResetPassword = () => {
  const [resetPassword, { loading }] = useMutation(RESET);
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email) {
      const variables = { email };

      resetPassword({ variables })
        .then(() =>
          toast.success(
            'We have sent you a message to reset your password. Please check your mail.',
          ),
        )
        .catch((err) => err.graphQLErrors.map(({ message }) => toast.error(message)));
    }
  };

  const handleChange = ({ target: { value } }) => {
    setEmail(value);
  };

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h3 className="mb-4">Recover Password</h3>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
            <FormText>
              Enter your email address below to receive a link to reset your password.
            </FormText>
          </FormGroup>
          <div className="d-flex justify-content-between">
            <Button className="submit">Submit {loading ? <Loading invert /> : null}</Button>
            <Link to="/sign-in" className="btn btn-secondary question-btn">
              Remember password?
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default ResetPassword;
