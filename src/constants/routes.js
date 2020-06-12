import ICONS from 'constants/icons';

import Dashboard from 'screens/Dashboard';
import Alarms from 'screens/Alarms';

const ROUTES = {
  DASHBOARD: {
    id: 0,
    exact: true,
    name: 'dashboard',
    path: '/dashboard',
    title: 'Dashboard',
    component: Dashboard,
    icon: ICONS.EQUALIZER,
  },
  ALARMS: {
    id: 10,
    exact: true,
    name: 'alarms',
    path: '/alarms',
    title: 'Alarms',
    component: Alarms,
    icon: ICONS.NOTIFICATIONS,
  },
};

export const BASE_ROUTE = {
  path: '/',
};

export default ROUTES;
