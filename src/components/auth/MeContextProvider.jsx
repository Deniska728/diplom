import React, { useEffect, useState } from 'react';

import { useQuery } from '@apollo/react-hooks';

import ME_QUERY from 'graphql/queries/user/me';

import MeContext from './MeContext';

const MeContextProvider = ({ children }) => {
  const meQuery = useQuery(ME_QUERY);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (meQuery.data && meQuery.data.me) {
      setUser(meQuery.data.me);
    }
  }, [meQuery]);

  const loading = meQuery.loading;

  let isAuthenticated = !!(!loading && meQuery.data && meQuery.data.me && meQuery.data.me.id);

  const logout = () => {
    setUser({});
    localStorage.removeItem('access_token');
    meQuery.refetch();
  };

  return (
    <MeContext.Provider
      value={{
        loading,
        isAuthenticated,
        logout,
        setUser,
        me: user,
        refetchMe: meQuery.refetch,
      }}
    >
      {children}
    </MeContext.Provider>
  );
};

export default MeContextProvider;
