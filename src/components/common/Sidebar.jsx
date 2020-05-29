import React from 'react';

import { useSelector } from 'react-redux';

import { Link, NavLink } from 'react-router-dom';

const Sidebar = ({ user }) => {
  const schemaId = useSelector((state) => state.schemas.currentSchemaId);
  const userAvatarUrl = (user && user.profile && user.profile.picture) || null;

  const userProfileStyle = {};
  if (userAvatarUrl) userProfileStyle.backgroundImage = `url(${userAvatarUrl})`;

  return (
    <div className="sidebar">
      <div className="logo">
        <Link to="/" className="logo-link">
          Qq
        </Link>
      </div>
      <div className="schema-links">
        {schemaId && (
          <div className="menu-item">
            <NavLink className="item-link" to={`/schema/${schemaId}`}>
              S
            </NavLink>
            <NavLink className="item-link" to={`/schema/${schemaId}/members`}>
              M
            </NavLink>
          </div>
        )}
        <div className="menu-item user-profile">
          <NavLink className="item-link" to="/profile" style={userProfileStyle}>
            {`${!userAvatarUrl ? 'U' : ''}`}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
