import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';

import SCHEMA from 'graphql/queries/schemas/schema';

const SchemaPage = () => {
  const { schemaId } = useParams();
  const { data, loading } = useQuery(SCHEMA, {
    variables: {
      id: schemaId,
    },
  });

  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export default SchemaPage;
