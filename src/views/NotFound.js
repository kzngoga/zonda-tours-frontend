import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../assets/images/zonda-logo.png';

const NotFound = () => (
  <div className="wrapper">
    <div className="not-found-div text-center">
      <img src={Logo} alt="Logo_Pic" width="180" height="180" />
      <h1 className="text-dark font-weight-bold">404, Page not Found!</h1>
      <p className="text-dark mt-2 text-center" style={{ fontSize: 15 }}>
        Sorry, the page you are looking for was not found! make sure you type
        the right URL.
      </p>
      <Link
        className="mt-5 text-white btn btn-success px-5"
        to="/"
        exact
        style={{ borderRadius: 20 }}
      >
        To Login
        <FontAwesomeIcon icon={['fas', 'sign-in-alt']} className="ml-2" />
      </Link>
    </div>
  </div>
);

export default NotFound;
