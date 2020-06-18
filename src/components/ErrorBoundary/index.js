import React, { Component } from 'react';
import { node } from 'prop-types';

import Errored from 'components/Errored';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null
    };
  }
  static getDerivedStateFromError(error) {
    console.error(error);

    return {
      error
    };
  }
  render() {
    const { error } = this.state;
    const { children, errorComponent: ErrorComponent } = this.props;

    if (this.state.hasError) {
      return <ErrorComponent error={error} />;
    }

    return children;
  }
}

ErrorBoundary.defaultProps = {
  errorComponent: <Errored message="Something happened" />
};

ErrorBoundary.propTypes = {
  children: node,
  errorComponent: node,
};

export default ErrorBoundary;
