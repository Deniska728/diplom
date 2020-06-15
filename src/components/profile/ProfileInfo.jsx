import React, { useState, useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { toast } from 'react-toastify';

import { FaCamera } from 'react-icons/fa';
import { Widget } from '@uploadcare/react-widget';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import Loading from 'components/common/Loading';

import UPDATE_USER from 'graphql/mutations/auth/updateUser';

import track from 'helpers/track';

const inputs = [
  {
    type: 'text',
    name: 'username',
    label: 'Username',
    required: true,
  },
  {
    type: 'email',
    name: 'email',
    label: 'Email',
    required: true,
  },
  {
    type: 'text',
    name: 'firstName',
    label: 'First Name',
    required: false,
  },
  {
    type: 'text',
    name: 'lastName',
    label: 'Last Name',
    required: false,
  },
];

const ProfileInfo = ({ me }) => {
  const widgetApi = useRef();
  const [updateUser, { loading }] = useMutation(UPDATE_USER);
  const [isChange, setIsChange] = useState(false);
  const [values, setValues] = useState({
    username: me.username || '',
    email: me.email || '',
    firstName: (me.profile && me.profile.firstName) || '',
    lastName: (me.profile && me.profile.lastName) || '',
    picture: (me.profile && me.profile.picture) || '',
  });
  const { username, firstName, picture } = values;

  const handleFileChange = (e) => {
    handleChange({ target: { value: e.cdnUrl, name: 'picture' } });
  };

  const handleClick = () => {
    widgetApi.current.openDialog();
  };

  const handleChange = ({ target: { value, name } }) => {
    !isChange && setIsChange(true);
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const variables = {};

    Object.keys(values).forEach((key) => {
      if (values[key]) variables[key] = values[key];
    });

    track({
      category: 'Update profile info',
      action: 'User pressed the update profile info button',
    });

    updateUser({ variables })
      .then(() => toast.success('Profile was successfully updated'))
      .catch((err) => err.graphQLErrors.map(({ message }) => toast.error(message)));
  };

  const letter = !picture && firstName ? firstName[0] : username[0];

  return (
    <div className="update-profile-info">
      <div className="avatar-selector" onClick={handleClick}>
        {picture ? (
          <img src={picture} alt="avatar" className="avatar" height="70" width="70" />
        ) : (
          <div className="no-avatar">
            <span>{letter}</span>
          </div>
        )}
        <div className="cam-icon">
          <FaCamera />
        </div>
      </div>
      <Widget
        publicKey={process.env.REACT_APP_UPLOADCARE_API_KEY}
        id="file"
        tabs="file url"
        onChange={handleFileChange}
        preloader={null}
        ref={widgetApi}
        imagesOnly
        crop
      />
      <Form onSubmit={handleSubmit}>
        {inputs.map(({ type, name, label, required }) => (
          <FormGroup key={name}>
            <Label for={type}>{label}</Label>
            <Input
              type={type}
              id={name}
              name={name}
              value={values[name]}
              onChange={handleChange}
              required={required}
            />
          </FormGroup>
        ))}
        <div className="d-flex justify-content-between">
          <Button className="submit" type="submit" disabled={!isChange}>
            Submit {loading ? <Loading invert /> : null}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ProfileInfo;
