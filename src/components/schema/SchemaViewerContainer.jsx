import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';

import { toast } from 'react-toastify';

import Loading from 'components/common/Loading';
import Schema from 'components/schema/Schema';

import SCHEMA from 'graphql/queries/schemas/schema';

const SchemaViewerContainer = ({ schemaId }) => {
  const { data, loading, error } = useQuery(SCHEMA, {
    variables: {
      id: schemaId,
    },
  });

  useEffect(() => {
    if (error) error.graphQLErrors.map(({ message }) => toast.error(message));
  }, [error]);

  if (error) return <Redirect to="/" />;
  if (loading) return <Loading page />;

  return <Schema schema={data.schema && data.schema.introspectionSchema} schemaId={schemaId} />;
};

export default SchemaViewerContainer;
