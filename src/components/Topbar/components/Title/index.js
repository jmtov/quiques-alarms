import React, { useMemo } from 'react';
import { string } from 'prop-types';
import { useLocation } from 'react-router-dom';

import ROUTES_OBJECT from 'constants/routes';

const DEFAULT_TITLE = 'Quique\'s Alarms App';

const ROUTES = Object.values(ROUTES_OBJECT);

function Title({ className }) {
  const { pathname } = useLocation();

  const title = useMemo(() => {
    const matchingRoute = ROUTES.find(route => route.path === pathname);
    const matchingRouteTitle = matchingRoute && matchingRoute.title ? matchingRoute.title : DEFAULT_TITLE;
    return matchingRouteTitle;
  }, [pathname]);

  return (
    <h1 className={className}>{title}</h1>
  );
}

Title.propTypes = {
  className: string
};

export default Title
