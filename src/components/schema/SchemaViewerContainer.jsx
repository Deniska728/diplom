import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import Loading from 'components/common/Loading';
import Schema from 'components/schema/Schema';

import SCHEMA from 'graphql/queries/schemas/schema';

const SchemaViewerContainer = ({ schemaId }) => {
  const { data, loading } = useQuery(SCHEMA, {
    variables: {
      id: schemaId,
    },
  });

  if (loading) return <Loading page />;

  return <Schema schema={data.schema && data.schema.introspectionSchema} schemaId={schemaId} />;
};

export default SchemaViewerContainer;
