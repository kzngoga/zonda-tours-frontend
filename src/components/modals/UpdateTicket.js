/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable operator-linebreak */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import fetchBusesAction from '../../redux/actions/bus/fetchBuses';
import UpdateTicketForm from './UpdateTicketForm';
import Loader from '../Loader';
import DisplayError from '../DisplayError';

const Modal = ({
  fetchBusesAction: fetchAction,
  fetchBuses,
  refetch,
  id,
  data,
}) => {
  const [status, setStatus] = useState('initial');
  const [resultsData, setResultsData] = useState([]);

  useEffect(() => {
    if (status === 'initial') {
      fetchAction();
      setStatus('fetching');
    }

    if (fetchBuses.status === 'success') {
      setStatus('success');
      setResultsData(fetchBuses.results);
    }

    if (fetchBuses.status === 'error') {
      const { error } = fetchBuses;
      if (error.status === '404') {
        setStatus('no_data');
      }

      if (error.status === '500') {
        setStatus('network_error');
      } else {
        setStatus('unknown_error');
      }
    }
    return undefined;
  }, [fetchBuses]);

  const DisplayData = ({ children }) => {
    let data;
    switch (status) {
      case 'success':
        data = <>{children}</>;
        break;
      case 'fetching':
        data = <Loader marginTop="50" />;
        break;
      case 'no_data':
        data = (
          <DisplayError
            title="No Data Found!"
            desc="No buses added to the database yet!"
            marginTop="50"
          />
        );
        break;
      case 'network_error':
        data = (
          <DisplayError
            title="No Internet Connection!"
            desc="Your network is slow / down, please try again later!"
            marginTop="50"
          />
        );
        break;

      case 'unknown_error':
        data = (
          <DisplayError
            title="Unexpected Error!"
            desc="Oops! Something unexpected occured, please try again later."
            marginTop="50"
          />
        );
        break;

      default:
        data = <Loader marginTop="50" />;
        break;
    }
    return data;
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-success px-2 py-1  text-white"
        style={{ fontSize: 15 }}
        data-toggle="modal"
        data-target={`#updateBus${id}`}
      >
        <FontAwesomeIcon icon={['fas', 'pencil-alt']} />
      </button>
      <div
        className="modal fade"
        id={`updateBus${id}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="updateBus"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content border-0 artist-modal">
            <div className="modal-header">
              <h4
                className="section-title p-0 m-0 text-dark text-center mx-auto font-weight-bold"
                style={{ fontSize: 20.7 }}
              >
                Edit Bus&#39;s info.
              </h4>
              <span
                data-dismiss="modal"
                className="close-button cursor-pointer text-center text-dark"
              >
                &times;
              </span>
            </div>
            <div className="modal-body">
              <div className="modal-form-div">
                <DisplayData>
                  <UpdateTicketForm
                    busData={resultsData}
                    data={data}
                    id={id}
                    refetch={refetch}
                  />
                </DisplayData>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired,
  fetchBusesAction: PropTypes.func.isRequired,
  fetchBuses: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ fetchBuses }) => ({
  fetchBuses,
});

export default connect(mapStateToProps, { fetchBusesAction })(Modal);
