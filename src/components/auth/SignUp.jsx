import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

import Loading from 'components/common/Loading';

import SIGN_UP from 'graphql/mutations/auth/signUp';
import MeContext from './MeContext';

import track from 'helpers/track';

const SignIn = () => {
  const history = useHistory();
  const { setUser, refetchMe } = useContext(MeContext);
  const [signUp, { loading }] = useMutation(SIGN_UP);
  const [isOpen, setIsOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      username: '',
    },
    validationSchema: yup.object({
      username: yup.string().max(20, 'Must be 20 characters or less').required('Required'),
      email: yup.string().email('Invalid email address').required('Required'),
      password: yup
        .string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gm,
          'Password must contain at least one letter and a number..',
        ),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = ({ email, password, username }) => {
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
          track({
            category: 'Sign Un',
            action: 'User pressed the sign up button',
          });
          history.push('/');
        })
        .catch((err) => err.graphQLErrors.map(({ message }) => toast.error(message)));
    }
  };
  return (
    <div className="auth-page">
      <div className="auth-form">
        <h3 className="mb-4">Sign Up</h3>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input name="username" {...formik.getFieldProps('username')} />
            {formik.touched.username && formik.errors.username ? (
              <div className="error">{formik.errors.username}</div>
            ) : null}
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input name="email" {...formik.getFieldProps('email')} />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <div className="input-with-icon">
              <Input
                name="password"
                {...formik.getFieldProps('password')}
                type={isOpen ? 'text' : 'password'}
              />
              <div className="icon" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </FormGroup>
          <FormGroup className="consent-text">
            By clicking the "Submit" button, you accept the{' '}
            <Link to="/terms" className="terms-link">
              Consent
            </Link>{' '}
            to the processing of personal data.
          </FormGroup>
          <div className="d-flex justify-content-between">
            <Button type="submit" className="submit" disabled={loading}>
              Submit {loading ? <Loading invert /> : null}
            </Button>
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
