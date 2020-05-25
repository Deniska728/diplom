import React from 'react';

const Schema = ({ schema }) => {
  return <div>{JSON.stringify(schema, null, 2)}</div>;
};

export default Schema;
