import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import Home from 'components/home/Home';

import Layout from 'components/Layout';
import Loading from 'components/common/Loading';
import SignIn from 'components/auth/SignIn';
import SignUp from 'components/auth/SignUp';
import LegalPage from 'components/legal/LegalPage';
import ResetPassword from 'components/auth/ResetPassword';
import ChangePassword from 'components/auth/ChangePassword';
import SchemaPage from 'components/schema/SchemaPage';
import EmptyPage from 'components/schema/EmptyPage';
import Profile from 'components/profile/Profile';

import MeContext from 'components/auth/MeContext';

const Routes = () => {
  const { me, loading, refetchMe, isAuthenticated } = useContext(MeContext);
  const userId = me && me.id;

  if (loading) return <Loading page />;

  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" render={() => <Home user={userId} meRefetch={refetchMe} />} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/terms" component={LegalPage} />
        <Route
          path="/reset-password"
          render={() => (
            <Switch>
              <Route exact path="/reset-password" component={ResetPassword} />
              <Route path="/reset-password/:resetPasswordToken" component={ChangePassword} />
            </Switch>
          )}
        />
        {isAuthenticated && (
          <Route path="/">
            <Layout user={me}>
              <Switch>
                <Route
                  path="/schema"
                  render={() => (
                    <Switch>
                      <Route path="/schema/:schemaId/" component={() => <SchemaPage user={me} />} />
                      <Route component={EmptyPage} />
                    </Switch>
                  )}
                />
                <Route path="/profile" component={Profile} />
              </Switch>
            </Layout>
          </Route>
        )}
        {!isAuthenticated && <Route render={() => <Redirect to="/" />} />}
      </Switch>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </React.Fragment>
  );
};

export default Routes;
