import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

const Comments = () => {
  const { entity, entityId } = useParams();
  const [id, setId] = useState(entityId);

  useEffect(() => {
    if (entityId.match('field')) {
      setId(entityId.replace('field', ''));
    }
  }, []);

  return (
    <div className="comments-container">
      <div className="comments-header">
        <div>Type {entity ? entity : ''}</div>
      </div>
    </div>
  );
};

export default Comments;
