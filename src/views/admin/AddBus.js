/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validator from '../../helpers/validator';
import SideBar from '../../components/Sidebar';
import addBusAction from '../../redux/actions/bus/addBus';

const Dashboard = ({ addBus, addBusAction: addAction }) => {
  const history = useHistory();
  const [submitting, setSubmitting] = useState(false);
  const [successAction, setSuccessAction] = useState(false);
  const [errors, setErrors] = useState([]);
  const [plateNo, setPlateNo] = useState('');
  const [seats, setSeats] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('ZONDA_TOURS_TOKEN')) {
      return history.push('/');
    }

    setSubmitting(false);
    setSuccessAction(false);

    if (addBus.status === 'success') {
      setSubmitting(false);
      setSuccessAction(true);
      setPlateNo('');
      setSeats('');
    }

    if (addBus.status === 'error') {
      setSubmitting(false);
      return setErrors([addBus.error.message]);
    }

    return undefined;
  }, [addBus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      plateNo,
      seats,
    };

    const validationErrors = await validator(data);
    if (validationErrors.length > 0) return setErrors(validationErrors);

    if (successAction) {
      setSuccessAction(false);
    }
    setErrors([]);
    setSubmitting(true);
    return addAction(data);
  };

  return (
    <div className="wrapper" style={{ backgroundColor: '#f6f5fa' }}>
      <div className="container-fluid">
        <div className="row">
          <SideBar />
          <main
            role="main"
            className="col-md-9 ml-sm-auto col-lg-10 main-content pb-4"
            style={{ backgroundColor: '#f6f5fa' }}
          >
            <h4 className=" font-weight-bold mt-5" style={{ fontSize: 18 }}>
              Add a new bus
            </h4>
            <div className="container mt-5">
              <form action="" className="dash-form">
                {errors.map((error, index) => (
                  <div
                    className="alert alert-danger alert-dismissible mt-4 fade show"
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
                      <FontAwesomeIcon
                        icon={['fas', 'check-circle']}
                        className="mr-1"
                      />
                      Success!
                    </strong>
                    <span className="alert-txt mt-2">
                      Bus Added Successfully!
                    </span>
                  </div>
                ) : null}
                <div className="form-group mt-3 col-6">
                  <label htmlFor="plateNo">Bus Plate N0.</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="prepend-style border-dark bg-dark text-white input-group-text">
                        <FontAwesomeIcon icon={['fas', 'bus']} />
                      </span>
                    </div>
                    <input
                      type="text"
                      id="plateNo"
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
                  <label htmlFor="seats">Number of Seats</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="prepend-style border-dark bg-dark text-white input-group-text">
                        <FontAwesomeIcon icon={['fas', 'chair']} />
                      </span>
                    </div>
                    <input
                      type="text"
                      id="seats"
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
                <div className="form-group mt-5 ml-3">
                  {submitting ? (
                    <button
                      type="button"
                      className="text-white btn btn-secondary px-5 mt-2 cursor-disabled"
                      style={{ borderRadius: 20 }}
                      disabled
                    >
                      Adding
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="text-white btn btn-dark px-5 mt-2"
                      style={{ borderRadius: 20 }}
                      onClick={handleSubmit}
                    >
                      + Add Bus
                    </button>
                  )}
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  addBusAction: PropTypes.func.isRequired,
  addBus: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ addBus }) => ({ addBus });

export default connect(mapStateToProps, { addBusAction })(Dashboard);
