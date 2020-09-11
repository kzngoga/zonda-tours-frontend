import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SideBar from '../../components/Sidebar';

const Dashboard = () => {
  const history = useHistory();
  const [submitting, setSubmitting] = useState(false);
  const [successAction, setSuccessAction] = useState(false);
  const [errors, setErrors] = useState([]);
  const [plateNo, setPlateNo] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('ZONDA_TOURS_TOKEN')) {
      return history.push('/');
    }
    return undefined;
  });

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
                      onChange={(e) => {
                        setPlateNo(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
