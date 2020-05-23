import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

const Routes = () => {
  const user = true;

  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/test">test</Link>
      <Switch>
        <Route exact path="/" render={() => <div>Home page</div>} />
        {user && <Route path="/test" component={() => <div>Test page</div>} />}
      </Switch>
    </div>
  );
};

export default Routes;
