const SET_CURRENT_SCHEMA = 'graphqq/schemas/SET_CURRENT_SCHEMA';
const RESET_CURRENT_SCHEMA = 'graphqq/schemas/RESET_CURRENT_SCHEMA';

const initialState = {
  currentSchema: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_CURRENT_SCHEMA:
      return { ...state, currentSchemaId: payload };
    case RESET_CURRENT_SCHEMA:
      return { ...state, currentSchemaId: initialState.currentSchema };
    default:
      return state;
  }
};

export const setCurrentSchema = (payload) => ({
  type: SET_CURRENT_SCHEMA,
  payload,
});

export const resetCurrentSchema = (payload) => ({
  type: RESET_CURRENT_SCHEMA,
  payload,
});
