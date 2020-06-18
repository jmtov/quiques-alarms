import React from 'react';
import SummaryCard from 'components/SummaryCard';

import ErrorBoundary from 'components/ErrorBoundary';

import './styles.scss';

function Dashboard() {
  return (
    <div className="dashboard-screen">
      <ErrorBoundary>
        <SummaryCard />
      </ErrorBoundary>
    </div>
  );
}

export default Dashboard;
