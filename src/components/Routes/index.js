import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import ROUTES_OBJECT, { BASE_ROUTE } from 'constants/routes';

import Layout from 'components/Layout';

const ROUTES = Object.values(ROUTES_OBJECT);

function Routes() {
  return (
    <Layout>
      <Switch>
        {ROUTES.map(route => (
          <Route
            key={route.id}
            name={route.name}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}
        <Route path={BASE_ROUTE.path}>
          <Redirect to={ROUTES_OBJECT.DASHBOARD.path} />
        </Route>
      </Switch>
    </Layout>
  );
}

export default Routes;
