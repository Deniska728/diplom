import React from 'react';

import { useParams, Route } from 'react-router-dom';

import SchemaViewerContainer from 'components/schema/SchemaViewerContainer';

const SchemaPage = () => {
  const { schemaId } = useParams();

  return (
    <Route
      path="/schema/:schemaId/"
      component={() => <SchemaViewerContainer schemaId={schemaId} />}
    />
  );
};

export default SchemaPage;
