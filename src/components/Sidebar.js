/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logoutAction from '../redux/actions/admin/logout';
import Logo from '../assets/images/zonda-logo.png';

const SideBar = ({ logoutAction: logout, admin }) => {
  const history = useHistory();

  useEffect(() => {
    if (admin.status === 'admin_logout_success') {
      localStorage.removeItem('ZONDA_TOURS_TOKEN');
      return history.push('/');
    }
    return undefined;
  }, [admin]);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="col-md-2 d-none d-md-block sidebar">
      <div className="sidebar-sticky">
        <div className="sidebar-img text-center mt-5">
          <p>
            <img src={Logo} alt="Logo" width="150" height="150" />
          </p>
        </div>
        <ul className="nav flex-column dash-nav">
          <li className="nav-item">
            <NavLink
              exact
              className="nav-link"
              to="/admin"
              activeClassName="active"
            >
              <span className="">
                <FontAwesomeIcon icon={['fas', 'home']} />
              </span>
              <span className="ml-2">Dashboard</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              className="nav-link"
              to="/buses/new"
              activeClassName="active"
            >
              <span className="">
                <FontAwesomeIcon icon={['fas', 'plus-circle']} />
              </span>
              <span className="ml-2">Add Bus</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              className="nav-link"
              to="/buses/all"
              activeClassName="active"
            >
              <span className="">
                <FontAwesomeIcon icon={['fas', 'bus-alt']} />
              </span>
              <span className="ml-2">All Buses</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              className="nav-link"
              to="/tickets/all"
              activeClassName="active"
            >
              <span className="">
                <FontAwesomeIcon icon={['fas', 'plus-circle']} />
              </span>
              <span className="ml-2">Add Ticket</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              className="nav-link"
              to="/tickets/all"
              activeClassName="active"
            >
              <span className="">
                <FontAwesomeIcon icon={['fas', 'ticket-alt']} />
              </span>
              <span className="ml-2">All Tickets</span>
            </NavLink>
          </li>
          <li className="nav-item ml-3">
            <button
              type="button"
              className="btn btn-success py-1 mt-3"
              onClick={handleLogout}
            >
              Logout{' '}
              <FontAwesomeIcon
                icon={['fas', 'sign-out-alt']}
                className="ml-2"
              />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

SideBar.propTypes = {
  logoutAction: PropTypes.func.isRequired,
  admin: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ admin }) => ({ admin });

export default connect(mapStateToProps, { logoutAction })(SideBar);
