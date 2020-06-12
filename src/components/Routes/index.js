import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import ROUTES, { BASE_ROUTE } from 'constants/routes';

function Routes() {
  const routes = Object.values(ROUTES);

  return (
    <Switch>
      {routes.map(route => (
        <Route
          key={route.id}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
      <Route path={BASE_ROUTE.path}>
        <Redirect to={ROUTES.DASHBOARD.path} />
      </Route>
    </Switch>
  );
}

export default Routes;
