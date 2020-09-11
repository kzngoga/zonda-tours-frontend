/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Logo from '../assets/images/zonda-logo.png';
import loginAction from '../redux/actions/admin/login';

const Login = ({ loginAction: login, admin }) => {
  const history = useHistory();
  const [isPasswordShown, setPasswordShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (localStorage.getItem('ZONDA_TOURS_TOKEN')) {
      return history.push('/admin');
    }

    if (admin.status === 'admin_login_success') {
      setSubmitting(false);
      setUsername('');
      setPassword('');
      setError('');

      localStorage.setItem('ZONDA_TOURS_TOKEN', admin.token);
      return history.push('/admin');
    }

    if (admin.status === 'admin_login_error') {
      setSubmitting(false);
      return setError(admin.error.message);
    }
    return undefined;
  }, [admin]);

  const togglEye = isPasswordShown ? 'eye-slash' : 'eye';

  const showLoginPassword = () => {
    setPasswordShow(!isPasswordShown);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username,
      password,
    };

    if (!username || !password) {
      return setError('All Fields are required!');
    }
    setError('');
    setSubmitting(true);
    return login(data);
  };

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
                  <span className="prepend-style border-dark bg-dark text-white input-group-text">
                    <FontAwesomeIcon icon={['fas', 'envelope']} />
                  </span>
                </div>
                <input
                  type="text"
                  id="username"
                  className="form-control my-input no-shadow"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="username">Password</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="prepend-style input-group-text border-dark bg-dark text-white">
                    <FontAwesomeIcon icon={['fas', 'lock']} />
                  </span>
                </div>
                <input
                  type={isPasswordShown ? 'text' : 'password'}
                  id="password"
                  className="form-control my-pwd-input my-input no-shadow"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <div className="input-group-append">
                  <span className="input-group-text append-style bg-white">
                    <FontAwesomeIcon
                      icon={['fas', togglEye]}
                      onClick={showLoginPassword}
                      className="cursor-pointer"
                    />
                  </span>
                </div>
              </div>
            </div>
            <div className="form-group text-center mt-5">
              {submitting ? (
                <button
                  type="button"
                  className="text-white btn btn-secondary px-5 mt-2 cursor-disabled"
                  style={{ borderRadius: 20 }}
                  disabled
                >
                  Loading
                </button>
              ) : (
                <button
                  type="button"
                  className="text-white btn btn-dark px-5 mt-2"
                  style={{ borderRadius: 20 }}
                  onClick={handleSubmit}
                >
                  Login
                </button>
              )}
            </div>
            <p className="text-danger mt-3 font-weight-bold text-center">
              {error}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  loginAction: PropTypes.func.isRequired,
  admin: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ admin }) => ({ admin });

export default connect(mapStateToProps, { loginAction })(Login);
