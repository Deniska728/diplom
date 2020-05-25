import React from 'react';

import Arguments from 'components/schema/Arguments';

import getFields from './getFields';
import parseKinds from './parseKinds';

const TypeList = ({ types, kind, schemaId }) => {
  if (!types) return '';
  const typesFields = types.map ? types : types.fields;

  const kindArgs =
    kind === 'OBJECT' || kind === 'INPUT_OBJECT' || kind === 'INTERFACE' || kind === 'ENUM';

  return (
    <div>
      {types &&
        typesFields.map((type) => {
          const fields = getFields(type);

          return (
            <div
              key={type.name + type.id}
              id={type.name}
              className={kind ? 'schema-type-type' : 'schema-type-underlying'}
            >
              {kind === 'SCALAR' && type.description && (
                <div
                  className="schema-type-description"
                  style={{ paddingLeft: 15 }}
                >{`"""${type.description}"""`}</div>
              )}
              <span className="schema-type-name">{type.name}</span>
              {type.interfaces && type.interfaces[0] && type.interfaces[0].name ? (
                <span>
                  {' '}
                  implements{' '}
                  <span className="schema-type-implement">{type.interfaces[0].name}</span>
                </span>
              ) : (
                ''
              )}

              {fields ? (kindArgs ? ' {' : !kind ? ' (' : '') : ''}
              <Arguments kind={kind} type={type} schemaId={schemaId} fields={fields} />
              {fields ? (kindArgs ? '}' : !kind ? ') ' : ' ') : ''}

              <div className="schema-type-link">{!kind && ': ' + (type && parseKinds(type))}</div>
            </div>
          );
        })}
    </div>
  );
};

export default TypeList;
