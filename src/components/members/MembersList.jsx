import React from 'react';

const MembersList = ({ members = [] }) => {
  return (
    <div>
      {members.map((member) => (
        <div key={member.id}>
          {member.email}
          {member.username}
        </div>
      ))}
    </div>
  );
};

export default MembersList;
