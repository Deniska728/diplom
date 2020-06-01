import React from 'react';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import Loading from 'components/common/Loading';
import MembersList from 'components/members/MembersList';
import MemberForm from 'components/members/MemberForm';

import MEMBERS from 'graphql/queries/members/members';

const MembersPage = ({ user }) => {
  const { schemaId } = useParams();
  const { data, loading } = useQuery(MEMBERS, {
    variables: {
      id: schemaId,
    },
  });

  if (loading) return <Loading />;

  const schema = data && data.schema;

  return (
    <div className="members-page">
      <h1>Members page</h1>
      <MembersList schemaMembers={schema} user={user} />
      {schema && user.id === schema.owner.id && <MemberForm schemaId={schemaId} />}
    </div>
  );
};

export default MembersPage;
