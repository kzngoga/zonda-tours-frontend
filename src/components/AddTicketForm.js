/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validator from '../helpers/validator';
import addTicketAction from '../redux/actions/ticket/addTicket';

const Dashboard = ({ addTicket, addTicketAction: addAction, data = [] }) => {
  const history = useHistory();
  const [submitting, setSubmitting] = useState(false);
  const [successAction, setSuccessAction] = useState(false);
  const [errors, setErrors] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [bus, setBus] = useState(0);
  const [seatNo, setSeatNo] = useState('');
  const [destination, setDestination] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('ZONDA_TOURS_TOKEN')) {
      return history.push('/');
    }

    setSubmitting(false);
    setSuccessAction(false);

    if (addTicket.status === 'success') {
      setSubmitting(false);
      setSuccessAction(true);
      setCustomerName('');
      setBus(0);
      setSeatNo('');
      setDestination('');
      setTime('');
    }

    if (addTicket.status === 'error') {
      setSubmitting(false);
      return setErrors([addTicket.error.message]);
    }

    return undefined;
  }, [addTicket]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      customerName,
      bus,
      seatNo,
      destination,
      time,
    };

    if (!customerName || !bus || !time) {
      return setErrors(['All fileds are required!']);
    }

    const validationErrors = await validator({ seatNo, destination });
    if (validationErrors.length > 0) return setErrors(validationErrors);

    if (successAction) {
      setSuccessAction(false);
    }
    setErrors([]);
    setSubmitting(true);
    return addAction(data);
  };

  return (
    <form action="" className="dash-form">
      {errors.map((error, index) => (
        <div
          className="alert alert-danger alert-dismissible mt-4 fade show"
          key={index}
        >
          <button type="button" className="close" onClick={() => setErrors([])}>
            &times;
          </button>
          <strong className="d-block">
            <FontAwesomeIcon icon={['fas', 'times-circle']} className="mr-1" />
            Error!
          </strong>
          <span className="alert-txt mt-2">{error}</span>
        </div>
      ))}
      {successAction ? (
        <div className="alert alert-primary alert-dismissible mt-4 fade show">
          <button
            type="button"
            className="close"
            onClick={() => setSuccessAction(false)}
          >
            &times;
          </button>
          <strong className="d-block">
            <FontAwesomeIcon icon={['fas', 'check-circle']} className="mr-1" />
            Success!
          </strong>
          <span className="alert-txt mt-2">
            Ticket Registered Successfully!
          </span>
        </div>
      ) : null}
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
              {data.map((elt) => (
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
      <div className="form-group mt-5 ml-3">
        {submitting ? (
          <button
            type="button"
            className="text-white btn btn-secondary px-5 mt-2 cursor-disabled"
            style={{ borderRadius: 20 }}
            disabled
          >
            Processing
          </button>
        ) : (
          <button
            type="button"
            className="text-white btn btn-dark px-4 mt-2"
            style={{ borderRadius: 20 }}
            onClick={handleSubmit}
          >
            + Register Ticket
          </button>
        )}
      </div>
    </form>
  );
};

Dashboard.propTypes = {
  addTicketAction: PropTypes.func.isRequired,
  addTicket: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ addTicket }) => ({ addTicket });

export default connect(mapStateToProps, { addTicketAction })(Dashboard);
