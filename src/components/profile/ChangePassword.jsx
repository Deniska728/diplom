import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { toast } from 'react-toastify';

import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

import Loading from 'components/common/Loading';

import CHANGE_PASSWORD from 'graphql/mutations/auth/changePassword';

import track from 'helpers/track';

const inputs = [
  {
    title: 'Old Password',
    type: 'oldPassword',
  },
  {
    title: 'New Password',
    type: 'newPassword',
  },
];

const ChangePassword = () => {
  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD);
  const [values, setValues] = useState({
    newPassword: '',
    oldPassword: '',
  });
  const [isOpen, setIsOpen] = useState({
    newPassword: false,
    oldPassword: false,
  });

  const handleChange = ({ target: { value, name } }) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (window.confirm('Are you sure you want to change your password?')) {
      const { newPassword, oldPassword } = values;

      if (newPassword && oldPassword) {
        if (newPassword !== oldPassword) {
          const variables = {
            password: newPassword,
            oldPassword,
          };

          track({
            category: 'Change password',
            action: 'User pressed the change password button',
          });

          changePassword({ variables })
            .then(() => {
              setValues({
                newPassword: '',
                oldPassword: '',
              });
              toast.success('Password was successfully changed');
            })
            .catch((err) => err.graphQLErrors.map(({ message }) => toast.error(message)));
        } else {
          toast.error('You entered the same password');
        }
      }
    }
  };

  const toggle = (name) => {
    setIsOpen((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div className="change-password-form">
      <h3 className="mb-4">Recover Password</h3>
      <Form onSubmit={handleSubmit}>
        <input type="hidden" value="something" />
        {inputs.map(({ title, type }) => (
          <FormGroup key={type}>
            <Label for={type}>{title}</Label>
            <div className="input-with-icon">
              <Input
                type={isOpen[type] ? 'text' : 'password'}
                id={type}
                name={type}
                value={values[type]}
                onChange={handleChange}
                autoComplete="off"
                required
              />
              <div className="icon" onClick={() => toggle(type)}>
                {isOpen[type] ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </FormGroup>
        ))}
        <div className="d-flex justify-content-between">
          <Button className="submit" type="submit">
            Submit {loading ? <Loading invert /> : null}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ChangePassword;
