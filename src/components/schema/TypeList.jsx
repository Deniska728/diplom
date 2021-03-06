import React from 'react';

import { Link } from 'react-router-dom';

import Arguments from 'components/schema/Arguments';

import track from 'helpers/track';

import getFields from './getFields';
import parseKinds from './parseKinds';

const TypeList = ({ types, kind, schemaId, isHaveFields }) => {
  if (!types) return '';
  const typesFields = types.map ? types : types.fields;

  const kindArgs =
    kind === 'OBJECT' || kind === 'INPUT_OBJECT' || kind === 'INTERFACE' || kind === 'ENUM';

  const handleClick = (e, type) => {
    e.preventDefault();
    e.stopPropagation();

    document.getElementById(type.typeName).scrollIntoView();
  };

  const handleTrack = () => {
    track({
      category: 'Go to comment',
      action: 'User pressed the comment link',
    });
  };

  return (
    <div>
      {types &&
        typesFields.map((type) => {
          const fields = getFields(type);

          return (
            <Link
              key={type.name + type.id}
              to={`/schema/${schemaId}/comment/${type.name}/${
                isHaveFields ? 'field' + type.id : type.id
              }`}
              onClick={handleTrack}
              className="type-link"
            >
              <div id={type.name} className={kind ? 'schema-type-type' : 'schema-type-underlying'}>
                <span className="schema-type-name">{type.name}</span>
                {kind === 'SCALAR' && type.description && (
                  <div
                    className="schema-type-description"
                    style={{ paddingLeft: 15 }}
                  >{`"""${type.description}"""`}</div>
                )}
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

                <div className="schema-type-link" onClick={(e) => handleClick(e, type)}>
                  {!kind && ': ' + (type && parseKinds(type))}
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default TypeList;
