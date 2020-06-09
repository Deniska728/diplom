import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

import Loading from 'components/common/Loading';

import SIGN_UP from 'graphql/mutations/auth/signUp';
import MeContext from './MeContext';

const SignIn = () => {
  const history = useHistory();
  const { setUser, refetchMe } = useContext(MeContext);
  const [signUp, { loading }] = useMutation(SIGN_UP);
  const [{ email, password, username }, setValue] = useState({
    email: '',
    password: '',
    username: '',
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

    if (email && password && username) {
      const variables = {
        email,
        password,
        username,
      };

      signUp({ variables })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.signUp.token);
          setUser(data.signUp.user);
          refetchMe();
          history.push('/');
        })
        .catch((err) => err.graphQLErrors.map(({ message }) => toast.error(message)));
    }
  };
  return (
    <div className="auth-page">
      <div className="auth-form">
        <h3 className="mb-4">Sign Up</h3>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="email">Username</Label>
            <Input
              type="username"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
              required
            />
          </FormGroup>
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
            <Label for="password">Password</Label>
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
            <Link to="/sign-in" className="btn btn-secondary question-btn">
              Sign In
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
