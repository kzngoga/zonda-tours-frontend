/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import $ from 'jquery';
import validator from '../../helpers/validator';
import updateTicketAction from '../../redux/actions/ticket/updateTicket';

const UpdateTicketForm = ({
  data = [],
  busData,
  id,
  refetch,
  updateTicketAction: updateTicket,
  updateTicket: updatedTicket,
}) => {
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState('');
  const [trigger, setTrigger] = useState(true);
  const [customerName, setCustomerName] = useState('');
  const [bus, setBus] = useState(0);
  const [seatNo, setSeatNo] = useState('');
  const [destination, setDestination] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    setCustomerName(data.customerName);
    setBus(data.bus._id);
    setSeatNo(data.seatNo);
    setDestination(data.destination);
    setTime(data.time);

    if (updatedTicket.status === 'success') {
      $(`#updateBus${id}`).modal('hide');
      setStatus('success');
      setErrors([]);
      if (trigger) {
        refetch();
        setTrigger(false);
      }
    }

    if (updatedTicket.status === 'error') {
      setStatus('');
      return setErrors([updatedTicket.error.message]);
    }

    return undefined;
  }, [updatedTicket]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = await validator({
      customerName,
      bus,
      seatNo,
      destination,
      time,
    });
    if (validationErrors.length > 0) return setErrors(validationErrors);

    let payload;
    if (
      customerName !== data.customerName ||
      bus !== data.bus._id ||
      destination !== data.destination ||
      time !== data.time
    ) {
      payload = { customerName, bus, destination, time };
    }

    if (seatNo !== data.seatNo) {
      payload = { seatNo, customerName, bus, destination, time };
    }

    if (payload) {
      updateTicket(payload, id);
    } else {
      return setErrors(['Change something to update!']);
    }
    setErrors([]);
    return setStatus('submitting');
  };

  return (
    <>
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
              <label htmlFor="customerName">Customer Names</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="prepend-style border-dark bg-dark text-white input-group-text">
                    <FontAwesomeIcon icon={['fas', 'user-alt']} />
                  </span>
                </div>
                <input
                  type="text"
                  id="customerName"
                  className="form-control my-input no-shadow"
                  placeholder="Enter Customer Names"
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="form-group mt-3 col-6">
              <label htmlFor="seats">Choose Bus</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="prepend-style border-dark bg-dark text-white input-group-text">
                    <FontAwesomeIcon icon={['fas', 'bus']} />
                  </span>
                </div>
                <select
                  id="bus"
                  className="custom-select dash-gray-input"
                  onChange={(e) => {
                    setBus(e.target.value);
                  }}
                  value={bus}
                >
                  <option
                    defaultValue
                    disabled
                    value="0"
                    className="cursor-disabled"
                  >
                    Select bus
                  </option>
                  {busData.map((elt) => (
                    <option key={elt._id} value={elt._id}>
                      {elt.plateNo}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group mt-3 col-6">
              <label htmlFor="seatNo">Seat N0.</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="prepend-style border-dark bg-dark text-white input-group-text">
                    <FontAwesomeIcon icon={['fas', 'chair']} />
                  </span>
                </div>
                <input
                  type="text"
                  id="seatNo"
                  className="form-control my-input no-shadow"
                  placeholder="Enter Seat N0."
                  value={seatNo}
                  onChange={(e) => {
                    setSeatNo(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="form-group mt-3 col-6">
              <label htmlFor="destination">Destination</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="prepend-style border-dark bg-dark text-white input-group-text">
                    <FontAwesomeIcon icon={['fas', 'home']} />
                  </span>
                </div>
                <input
                  type="text"
                  id="destination"
                  className="form-control my-input no-shadow"
                  placeholder="(Ex. Kigali-Huye)"
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="form-group mt-3 col-6">
              <label htmlFor="time">Departure Time</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="prepend-style border-dark bg-dark text-white input-group-text">
                    <FontAwesomeIcon icon={['fas', 'clock']} />
                  </span>
                </div>
                <input
                  type="time"
                  id="time"
                  className="form-control my-input no-shadow"
                  value={time}
                  onChange={(e) => {
                    setTime(e.target.value);
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
    </>
  );
};

UpdateTicketForm.propTypes = {
  id: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired,
  updateTicketAction: PropTypes.func.isRequired,
  updateTicket: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ updateTicket }) => ({
  updateTicket,
});

export default connect(mapStateToProps, { updateTicketAction })(
  UpdateTicketForm
);
