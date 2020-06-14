import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

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
  const [{ newPassword, password }, setValue] = useState({
    newPassword: '',
    password: '',
  });
  const [isOpen, setIsOpen] = useState({
    newPassword: false,
    password: false,
  });

  const handleChange = ({ target: { value, name } }) => {
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="newPassword">New Password</Label>
            <div className="input-with-icon">
              <Input
                type={isOpen.newPassword ? 'text' : 'password'}
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={handleChange}
                required
              />
              <div className="icon" onClick={() => toggle('newPassword')}>
                {isOpen.newPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="password">Repeat Password</Label>
            <div className="input-with-icon">
              <Input
                type={isOpen.password ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                required
              />
              <div className="icon" onClick={() => toggle('password')}>
                {isOpen.password ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
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
