import React, { useEffect } from 'react';

import { useParams, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import SchemaViewerContainer from 'components/schema/SchemaViewerContainer';
import MembersPage from 'components/members/MembersPage';

import { setCurrentSchema } from 'ducks/schemas';

const SchemaPage = () => {
  const { schemaId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentSchema(schemaId));
  }, [dispatch, schemaId]);

  return (
    <React.Fragment>
      <Route
        path="/schema/:schemaId/members"
        component={() => <MembersPage schemaId={schemaId} />}
      />
      <Route
        path="/schema/:schemaId/"
        exact
        component={() => (
          <div>
            <Route
              path="/schema/:schemaId/"
              component={() => <SchemaViewerContainer schemaId={schemaId} />}
            />
          </div>
        )}
      />
    </React.Fragment>
  );
};

export default SchemaPage;
