import React from 'react';
import { withRouter } from 'react-router-dom';

import TypeLink from './TypeLink';

const Arguments = ({ type, kind, schemaId, fields }) => {
  if (kind === 'ENUM') {
    return fields.map((value) => {
      return (
        <div key={value.id} className="schema-type-enum">
          {value.name}
        </div>
      );
    });
  }

  if (kind === 'UNION') {
    return (
      <div className="schema-type-link" style={{ paddingLeft: 15 }}>
        ={' '}
        {type.possibleTypes.map(
          (value, i) => `${value.name}${type.possibleTypes.length - 1 > i ? ' | ' : ' '}`,
        )}
      </div>
    );
  }

  return <TypeLink kind={kind} fields={fields} schemaId={schemaId} />;
};

export default withRouter(Arguments);
