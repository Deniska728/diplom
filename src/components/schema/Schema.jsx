import React from 'react';

import TypeList from 'components/schema/TypeList';

const Schema = ({ schema }) => {
  const unlistedTypes = ['Query', 'Mutation', 'Subscription'];
  const queries = schema.types.find((type) => type.name === 'Query');
  const subscriptions = schema.types.find((type) => type.name === 'Subscription');
  const mutations = schema.types.find((type) => type.name === 'Mutation');

  const _scalar = schema.types.filter(
    (type) => type.kind === 'SCALAR' && !unlistedTypes.includes(type.name),
  );
  const _enum = schema.types.filter(
    (type) => type.kind === 'ENUM' && !unlistedTypes.includes(type.name),
  );
  const _object = schema.types.filter(
    (type) => type.kind === 'OBJECT' && !unlistedTypes.includes(type.name),
  );
  const _input = schema.types.filter((type) => type.kind === 'INPUT_OBJECT');
  const _interface = schema.types.filter((type) => type.kind === 'INTERFACE');
  const _union = schema.types.filter((type) => type.kind === 'UNION');

  return (
    <div>
      <TypeList schemaId={schema.id} types={queries} />
      <TypeList schemaId={schema.id} types={mutations} />
      <TypeList schemaId={schema.id} types={subscriptions} />
      <div className="schema-type">
        Object
        <TypeList kind="OBJECT" types={_object} schemaId={schema.id} />
      </div>
      <div className="schema-type">
        Enum
        <TypeList kind="ENUM" types={_enum} schemaId={schema.id} />
      </div>
      <div className="schema-type">
        Input
        <TypeList kind="INPUT_OBJECT" types={_input} schemaId={schema.id} />
      </div>
      <div className="schema-type">
        Union
        <TypeList kind="UNION" types={_union} schemaId={schema.id} />
      </div>
      <div className="schema-type">
        Scalar
        <TypeList kind="SCALAR" types={_scalar} schemaId={schema.id} />
      </div>
      <div className="schema-type clickable">
        Interface
        <TypeList kind="INTERFACE" types={_interface} schemaId={schema.id} />
      </div>
    </div>
  );
};

export default Schema;
