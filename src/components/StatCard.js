import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const StatCard = ({ count, title, iconHead, icon }) => {
    
  return (
    <div className="col-3">
      <div className="stat-div px-3 py-2">
        <div className="row">
          <div className="col-9">
            <div className="stat-content">
              <span className="d-block stat-title ">{title}</span>
              <span className="d-block stat-data font-weight-bold ">
                {typeof count === 'undefined' ? '-' : count.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="col-3 text-left">
            <span className="stat-icon">
              <FontAwesomeIcon icon={[iconHead, icon]} aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  iconHead: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

export default StatCard;
