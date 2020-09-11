import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ marginTop, loadText }) => (
  <div className="col text-center" style={{ marginTop: marginTop || 15 }}>
    <div
      className="spinner-border text-success spinner-border loader"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

Loader.propTypes = {
  marginTop: PropTypes.string.isRequired,
  loadText: PropTypes.string.isRequired,
};

export default Loader;
