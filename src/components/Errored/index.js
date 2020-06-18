import React from 'react';
import { string } from 'prop-types';

import './styles.scss';

function Errored({ message }) {
  return (
    <div className="error">
      <span className="error__title">¯\_(ツ)_/¯</span>
      <span className="error__message">{message}</span>
    </div>
  );
}

Errored.propTypes = {
  message: string
};

export default Errored;
