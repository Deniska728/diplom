import React from 'react';

import parseKinds from './parseKinds';

const TypeLink = ({ fields }) => {
  const handleClick = (e, type) => {
    e.preventDefault();
    e.stopPropagation();

    document.getElementById(type.typeName).scrollIntoView();
  };

  if (fields) {
    return (
      <div style={{ paddingLeft: 15 }}>
        {fields.map((field) => (
          <span key={field.name + field.id}>
            <span className="schema-type-name">{field.name}:</span>
            <div className="schema-type-link" onClick={(e) => handleClick(e, field)}>
              {parseKinds(field)}
            </div>
            <br />
          </span>
        ))}
      </div>
    );
  }

  return '';
};

export default TypeLink;
