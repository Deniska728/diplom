import React from 'react';
import { useSelector } from 'react-redux';

import { Link, NavLink } from 'react-router-dom';
import { GrGraphQl } from 'react-icons/gr';
import { FaUsers, FaArrowLeft } from 'react-icons/fa';

const Sidebar = ({ user }) => {
  const schemaId = useSelector((state) => state.schemas.currentSchemaId);

  if (!user.id) return <div />;
  const profile = (user && user.profile) || null;
  const userAvatarUrl = (profile && profile.picture) || null;

  const userProfileStyle = {};
  if (userAvatarUrl) userProfileStyle.backgroundImage = `url(${userAvatarUrl})`;

  const letter =
    !userAvatarUrl && (profile && profile.firstName ? profile.firstName[0] : user.username[0]);

  return (
    <div className="sidebar">
      <div className="logo">
        <Link to="/" className="logo-link">
          <FaArrowLeft />
        </Link>
      </div>
      <div className="schema-links">
        {schemaId && (
          <div className="menu-item">
            <NavLink className="item-link" to={`/schema/${schemaId}/comment`}>
              <GrGraphQl />
            </NavLink>
            <NavLink className="item-link" to={`/schema/${schemaId}/members`}>
              <FaUsers />
            </NavLink>
          </div>
        )}
        <div className="menu-item user-profile">
          <NavLink className="item-link avatar" to="/profile" style={userProfileStyle}>
            {!userAvatarUrl ? <div className="no-avatar">{letter}</div> : ''}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
