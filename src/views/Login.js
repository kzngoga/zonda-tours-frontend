import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../assets/images/zonda-logo.png';

const Login = () => {
  return (
    <div className="wrapper">
      <div className="container">
        <div className="form-div">
          <div className="text-center">
            <img src={Logo} alt="zonda-logo" width="180" height="180" />
          </div>
          <form action="">
            <div className="form-group mt-3">
              <label htmlFor="username">Username</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="prepend-style bg-success text-white input-group-text">
                    <FontAwesomeIcon icon={['fas', 'envelope']} />
                  </span>
                </div>
                <input
                  type="text"
                  id="username"
                  className="form-control my-input no-shadow"
                  placeholder="Username"
                />
              </div>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="username">Password</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="prepend-style input-group-text bg-success text-white">
                    <FontAwesomeIcon icon={['fas', 'lock']} />
                  </span>
                </div>
                <input
                  type="text"
                  id="password"
                  className="form-control my-pwd-input my-input no-shadow"
                  placeholder="Password"
                />
                <div className="input-group-append">
                  <span className="input-group-text append-style bg-white">
                    <FontAwesomeIcon icon={['fas', 'eye']} />
                  </span>
                </div>
              </div>
            </div>
            <div className="form-group text-center mt-5">
              <button
                type="button"
                className="text-white btn btn-success px-5 mt-2"
                style={{ borderRadius: 20 }}
              >
                Login
              </button>
              <button
                type="button"
                className="text-white btn btn-secondary px-5 mt-2 cursor-disabled"
                style={{ borderRadius: 20 }}
                disabled
              >
                Loading
              </button>
            </div>
            <p className="text-danger mt-3 font-weight-bold text-center">
              All Fields are required!
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
