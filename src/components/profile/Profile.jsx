import React, { useContext } from 'react';

import ChangePassword from 'components/profile/ChangePassword';

import Loading from 'components/common/Loading';
import MeContext from 'components/auth/MeContext';
import ProfileInfo from './ProfileInfo';

const UpdateUserPage = () => {
  const { me } = useContext(MeContext);

  if (!me.id) return <Loading />;

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <ProfileInfo me={me} />
      <ChangePassword />
    </div>
  );
};

export default UpdateUserPage;
