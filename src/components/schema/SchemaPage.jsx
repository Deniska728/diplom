import React, { useEffect } from 'react';

import { useParams, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import SchemaViewerContainer from 'components/schema/SchemaViewerContainer';
import MembersPage from 'components/members/MembersPage';
import Comments from 'components/comments/Comments';

import { setCurrentSchema } from 'ducks/schemas';

const SchemaPage = ({ user }) => {
  const { schemaId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentSchema(schemaId));
  }, [dispatch, schemaId]);

  return (
    <React.Fragment>
      <Route
        path="/schema/:schemaId/members"
        component={() => <MembersPage schemaId={schemaId} user={user} />}
      />
      <Route
        path="/schema/:schemaId/"
        component={() => (
          <div>
            <Route
              exact
              path="/schema/:schemaId/"
              render={() => <Redirect to={`/schema/${schemaId}/comment`} />}
            />
            <Route
              path="/schema/:schemaId/comment"
              component={() => <SchemaViewerContainer schemaId={schemaId} />}
            />
            <Route
              path="/schema/:schemaId/comment/:entity/:entityId"
              component={() => <Comments user={user} schemaId={schemaId} />}
            />
          </div>
        )}
      />
    </React.Fragment>
  );
};

export default SchemaPage;
