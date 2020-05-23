import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import Home from 'components/home/Home';

import ME from 'graphql/queries/user/me';

const Routes = () => {
  const { data, loading, refetch } = useQuery(ME);
  const user = data && data.me && data.me.id;

  if (loading) return <div>Loading...</div>;

  return (
    <Switch>
      <Route exact path="/" render={() => <Home user={user} meRefetch={refetch} />} />
      {user && <Route path="/test" component={() => <div>Test page</div>} />}
    </Switch>
  );
};

export default Routes;
