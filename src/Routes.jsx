import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import Home from 'components/home/Home';

import Layout from 'components/Layout';
import Loading from 'components/common/Loading';
import SchemaPage from 'components/schema/SchemaPage';
import EmptyPage from 'components/schema/EmptyPage';

import ME from 'graphql/queries/user/me';

const Routes = () => {
  const { data, loading, refetch } = useQuery(ME);
  const userId = data && data.me && data.me.id;

  if (loading) return <Loading page />;

  return (
    <Switch>
      <Route exact path="/" render={() => <Home user={userId} meRefetch={refetch} />} />
      {userId && (
        <Route path="/">
          <Layout user={data.me}>
            <Switch>
              <Route
                path="/schema"
                render={() => (
                  <Switch>
                    <Route path="/schema/:schemaId/" component={SchemaPage} />
                    <Route component={EmptyPage} />
                  </Switch>
                )}
              />
            </Switch>
          </Layout>
        </Route>
      )}
    </Switch>
  );
};

export default Routes;
