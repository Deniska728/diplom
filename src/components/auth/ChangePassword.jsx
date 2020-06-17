import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { useHistory, Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

import Loading from 'components/common/Loading';

import CHANGE_PASSWORD from 'graphql/mutations/auth/changePassword';

import track from 'helpers/track';

const ChangePassword = () => {
  const { resetPasswordToken } = useParams();
  const history = useHistory();
  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD);
  const [isOpen, setIsOpen] = useState({
    newPassword: false,
    password: false,
  });
  const formik = useFormik({
    initialValues: {
      newPassword: '',
      password: '',
    },
    validationSchema: yup.object({
      newPassword: yup
        .string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gm,
          'Password must contain at least one letter and a number.',
        ),
      password: yup
        .string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gm,
          'Password must contain at least one letter and a number.',
        ),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = ({ newPassword, password }) => {
    if (resetPasswordToken && newPassword && password && newPassword === password) {
      const variables = {
        token: resetPasswordToken,
        password,
      };

      changePassword({ variables })
        .then(() => {
          track({
            category: 'Change password',
            action: 'User pressed the change password button',
          });
          history.push('/sign-in');
          toast.success('Password was successfully changed');
        })
        .catch((err) => err.graphQLErrors.map(({ message }) => toast.error(message)));
    }
  };

  const toggle = (name) => {
    setIsOpen((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h3 className="mb-4">Recover Password</h3>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Label for="newPassword">New Password</Label>
            <div className="input-with-icon">
              <Input
                name="newPassword"
                {...formik.getFieldProps('newPassword')}
                type={isOpen.newPassword ? 'text' : 'password'}
              />
              <div className="icon" onClick={() => toggle('newPassword')}>
                {isOpen.newPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <div className="error">{formik.errors.newPassword}</div>
            ) : null}
          </FormGroup>
          <FormGroup>
            <Label for="password">Repeat Password</Label>
            <div className="input-with-icon">
              <Input
                name="password"
                {...formik.getFieldProps('password')}
                type={isOpen.password ? 'text' : 'password'}
              />
              <div className="icon" onClick={() => toggle('password')}>
                {isOpen.password ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </FormGroup>
          <div className="d-flex justify-content-between">
            <Button className="submit">Recover {loading ? <Loading invert /> : null}</Button>
            <Link to="/sign-in" className="btn btn-secondary question-btn">
              Remember password?
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
