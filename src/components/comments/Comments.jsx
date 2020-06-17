import React, { useState, useEffect } from 'react';

import { useParams, useHistory } from 'react-router-dom';

import CommentsList from 'components/comments/CommentsList';
import CommentsForm from 'components/comments/CommentsForm';

const Comments = ({ schemaId, user }) => {
  const { entity: entityName, entityId } = useParams();
  const history = useHistory();
  const [entity, setEntity] = useState({
    id: entityId,
    isField: false,
  });

  useEffect(() => {
    if (entityId.match('field')) {
      setEntity({
        id: entityId.replace('field', ''),
        isField: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="comments-container">
      <div className="comments-header">
        <span className="header">Type {entityName ? entityName : ''}</span>
        <button className="close" onClick={() => history.push(`/schema/${schemaId}/comment`)}>
          ×
        </button>
      </div>
      <CommentsList schemaId={schemaId} entity={entity} user={user} />
      <CommentsForm schemaId={schemaId} entity={entity} />
    </div>
  );
};

export default Comments;
