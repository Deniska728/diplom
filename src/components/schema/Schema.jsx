import React, { useState } from 'react';

import { Collapse } from 'reactstrap';

import TypeList from 'components/schema/TypeList';

const Schema = ({ schema }) => {
  const [collapse, setCollapse] = useState({
    query: true,
    subscription: true,
    mutation: true,
  });

  const toggle = (name) => {
    setCollapse((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

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
      {queries ? (
        <div className="schema-type clickable" onClick={() => toggle('query')}>
          type Query
        </div>
      ) : (
        ''
      )}
      <Collapse isOpen={collapse.query}>
        <div className="schema-type">
          <TypeList types={queries} schemaId={schema.id} />
        </div>
      </Collapse>
      {mutations ? (
        <div className="schema-type clickable" onClick={() => toggle('mutation')}>
          type Mutation
        </div>
      ) : (
        ''
      )}
      <Collapse isOpen={collapse.mutation}>
        <div className="schema-type">
          <TypeList schemaId={schema.id} types={mutations} />
        </div>
      </Collapse>
      {subscriptions ? (
        <div className="schema-type clickable" onClick={() => toggle('subscription')}>
          type Subscription
        </div>
      ) : (
        ''
      )}
      <Collapse isOpen={collapse.subscription}>
        <div className="schema-type">
          <TypeList schemaId={schema.id} types={subscriptions} />
        </div>
      </Collapse>
      <div className="schema-type">
        <div className="schema-type clickable">Object</div>
        <TypeList kind="OBJECT" types={_object} schemaId={schema.id} />
      </div>
      <div className="schema-type">
        <div className="schema-type clickable">Enum</div>
        <TypeList kind="ENUM" types={_enum} schemaId={schema.id} />
      </div>
      {_input ? (
        <div className="schema-type">
          <div className="schema-type clickable">Input</div>
          <TypeList kind="INPUT_OBJECT" types={_input} schemaId={schema.id} />
        </div>
      ) : (
        ''
      )}
      {_union.length ? (
        <div className="schema-type">
          <div className="schema-type clickable">Union</div>
          <TypeList kind="UNION" types={_union} schemaId={schema.id} />
        </div>
      ) : (
        ''
      )}
      <div className="schema-type">
        <div className="schema-type clickable">Scalar</div>
        <TypeList kind="SCALAR" types={_scalar} schemaId={schema.id} />
      </div>
      {_interface.length ? (
        <div className="schema-type clickable">
          <div className="schema-type clickable">Interface</div>
          <TypeList kind="INTERFACE" types={_interface} schemaId={schema.id} />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Schema;
