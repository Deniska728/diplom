import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
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
              <Route
                path="/profile"
                render={() => (
                  <div className="empty-page">
                    <div className="logo-container">
                      <div className="logo-heading">
                        <h1 className="logo">
                          Graph<span className="logo-letter">Q</span>q
                        </h1>
                        <h5 className="subheading">GraphQL Schema collaboration tool</h5>
                      </div>
                    </div>
                    <span className="description">
                      We're working on this feature. It will be available in next releases.
                    </span>
                  </div>
                )}
              />
            </Switch>
          </Layout>
        </Route>
      )}
      {!userId && <Route render={() => <Redirect to="/" />} />}
    </Switch>
  );
};

export default Routes;
