import Dashboard from 'screens/Dashboard';
import Alarms from 'screens/Alarms';

const ROUTES = {
  DASHBOARD: {
    id: 0,
    exact: true,
    name: 'dashboard',
    path: '/dashboard',
    component: Dashboard,
  },
  ALARMS: {
    id: 10,
    exact: true,
    name: 'alarms',
    path: '/alarms',
    component: Alarms,
  },
};

export const BASE_ROUTE = {
  path: '/',
};

export default ROUTES;
