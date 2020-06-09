import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

import Loading from 'components/common/Loading';

import LOGIN from 'graphql/mutations/auth/signIn';
import MeContext from './MeContext';

const SignIn = () => {
  const history = useHistory();
  const { setUser, refetchMe } = useContext(MeContext);
  const [signIn, { loading }] = useMutation(LOGIN);
  const [{ email, password }, setValue] = useState({
    email: '',
    password: '',
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = ({ target: { value, name } }) => {
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      const variables = {
        email,
        password,
      };

      signIn({ variables })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.signIn.token);
          setUser(data.signIn.user);
          refetchMe();
          history.push('/');
        })
        .catch((err) => err.graphQLErrors.map(({ message }) => toast.error(message)));
    }
  };



  return (
    <div className="auth-page">
      <div className="auth-form">
        <h3 className="mb-4">Sign In</h3>
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
          </FormGroup>
          <FormGroup>
            <div className="d-flex justify-content-between align-items-center">
              <Label for="password">Password</Label>
              <Link to="/reset-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>
            <div className="input-with-icon">
              <Input
                type={isOpen ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                required
              />
              <div className="icon" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </FormGroup>
          <div className="d-flex justify-content-between">
            <Button className="submit">Submit {loading ? <Loading invert /> : null}</Button>
            <Link to="/sign-up" className="btn btn-secondary question-btn">
              Sign up
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
