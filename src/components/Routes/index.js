import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import ROUTES, { BASE_ROUTE } from 'constants/routes';

import Layout from 'components/Layout';

function Routes() {
  const routes = Object.values(ROUTES);

  return (
    <Switch>
      <Layout>
        {routes.map(route => (
          <Route
            key={route.id}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}
      </Layout>
      <Route path={BASE_ROUTE.path}>
        <Redirect to={ROUTES.DASHBOARD.path} />
      </Route>
    </Switch>
  );
}

export default Routes;
