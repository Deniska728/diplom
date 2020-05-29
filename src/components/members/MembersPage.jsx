import React from 'react';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import Loading from 'components/common/Loading';
import MembersList from 'components/members/MembersList';

import SCHEMA from 'graphql/queries/schemas/schema';

const MembersPage = () => {
  const { schemaId } = useParams();
  const { data, loading } = useQuery(SCHEMA, {
    variables: {
      id: schemaId,
    },
  });

  if (loading) return <Loading />;

  return (
    <div>
      <MembersList members={data && data.schema && data.schema.members} />
    </div>
  );
};

export default MembersPage;
