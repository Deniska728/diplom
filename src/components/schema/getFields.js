const getFields = (type) => {
  let fields;

  if (type.possibleTypes && type.possibleTypes.length !== 0) fields = type.possibleTypes;
  if (type.fields && type.fields.length !== 0) fields = type.fields;
  if (type.inputFields && type.inputFields.length !== 0) fields = type.inputFields;
  if (type.args && type.args.length !== 0) fields = type.args;
  if (type.possibleValues && type.possibleValues.length !== 0) fields = type.possibleValues;
  if (type.enumValues && type.enumValues.length !== 0) fields = type.enumValues;

  return fields;
};

export default getFields;
