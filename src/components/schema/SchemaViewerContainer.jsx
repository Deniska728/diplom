import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';

import Loading from 'components/common/Loading';
import Schema from 'components/schema/Schema';

import SCHEMA from 'graphql/queries/schemas/schema';

const SchemaViewerContainer = ({ schemaId }) => {
  const { data, loading, error } = useQuery(SCHEMA, {
    variables: {
      id: schemaId,
    },
  });

  if (error) {
    return <Redirect to="/" />;
  }
  if (loading) return <Loading page />;

  return <Schema schema={data.schema && data.schema.introspectionSchema} schemaId={schemaId} />;
};

export default SchemaViewerContainer;
