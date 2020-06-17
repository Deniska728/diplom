const parseKinds = (type) => {
  let name;
  if (type && type.name) {
    name = type.typeName;
  }

  if (type && type.kinds) {
    type.kinds.reverse().forEach((kind) => {
      if (kind === 'NON_NULL') name = `${name}!`;
      if (kind === 'LIST') name = `[${name}]`;
    });
  }

  return name;
};

export default parseKinds;
