import React from 'react';

const initialMeContextValues = {
  me: {},
  loading: true,
  isAuthenticated: false,
};

const MeContext = React.createContext(initialMeContextValues);

export default MeContext;
