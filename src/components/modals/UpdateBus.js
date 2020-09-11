/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable operator-linebreak */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import $ from 'jquery';
import validator from '../../helpers/validator';
import updateBusAction from '../../redux/actions/bus/updateBus';

const Modal = ({
  updateBusAction: updateBus,
  updateBus: updatedBus,
  refetch,
  id,
  data,
}) => {
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState('');
  const [plateNo, setPlateNo] = useState('');
  const [seats, setSeats] = useState('');
  const [trigger, setTrigger] = useState(true);

  useEffect(() => {
    setPlateNo(data.plateNo);
    setSeats(data.seats);

    if (updatedBus.status === 'success') {
      $(`#updateBus${id}`).modal('hide');
      setStatus('success');
      setErrors([]);
      if (trigger) {
        refetch();
        setTrigger(false);
      }
    }

    if (updatedBus.status === 'error') {
      setStatus('');
      return setErrors([updatedBus.error.message]);
    }

    return undefined;
  }, [updatedBus]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = await validator({ plateNo, seats });
    if (validationErrors.length > 0) return setErrors(validationErrors);

    let payload;
    if (plateNo !== data.plateNo) {
      payload = { plateNo, seats };
    }

    if (seats !== data.seats) {
      payload = { seats };
    }

    if (payload) {
      updateBus(payload, id);
    } else {
      return setErrors(['Change something to update!']);
    }
    setErrors([]);
    return setStatus('submitting');
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
                <div className="">
                  {errors.map((error, index) => (
                    <div className="modal-front-alert-div">
                      <div
                        className="alert alert-danger alert-dismissible py-2 fade show"
                        key={index}
                      >
                        <button
                          type="button"
                          className="close"
                          onClick={() => setErrors([])}
                        >
                          &times;
                        </button>
                        <strong className="d-block">
                          <FontAwesomeIcon
                            icon={['fas', 'times-circle']}
                            className="mr-1"
                          />
                          Error!
                        </strong>
                        <span className="alert-txt mt-2">{error}</span>
                      </div>
                    </div>
                  ))}
                  <form className="mt-4 px-3">
                    <div className="form-row">
                      <div className="form-group mt-3 col-6">
                        <label htmlFor={`plateNo${id}`}>Bus Plate N0.</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="prepend-style border-dark bg-dark text-white input-group-text">
                              <FontAwesomeIcon icon={['fas', 'bus']} />
                            </span>
                          </div>
                          <input
                            type="text"
                            id={`plateNo${id}`}
                            className="form-control my-input no-shadow"
                            placeholder="Enter Plate N0."
                            value={plateNo}
                            maxLength="8"
                            onChange={(e) => {
                              setPlateNo(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-group mt-3 col-6">
                        <label htmlFor={`seats${id}`}>Number of Seats</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="prepend-style border-dark bg-dark text-white input-group-text">
                              <FontAwesomeIcon icon={['fas', 'chair']} />
                            </span>
                          </div>
                          <input
                            type="text"
                            id={`seats${id}`}
                            className="form-control my-input no-shadow"
                            placeholder="Enter Number of Seats"
                            maxLength="2"
                            value={seats}
                            onChange={(e) => {
                              setSeats(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group mt-4 text-center">
                      {status === 'submitting' ? (
                        <button
                          type="button"
                          className="text-white btn btn-secondary px-5 mt-2 cursor-disabled"
                          style={{ borderRadius: 20 }}
                          disabled
                        >
                          Updating
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="text-white btn btn-dark px-5 mt-2"
                          style={{ borderRadius: 20 }}
                          onClick={handleSubmit}
                        >
                          Edit Bus
                        </button>
                      )}
                    </div>
                  </form>
                </div>
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
  updateBusAction: PropTypes.func.isRequired,
  updateBus: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ updateBus }) => ({
  updateBus,
});

export default connect(mapStateToProps, { updateBusAction })(Modal);
