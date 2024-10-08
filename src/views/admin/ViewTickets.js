/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SideBar from '../../components/Sidebar';
import Loader from '../../components/Loader';
import DisplayError from '../../components/DisplayError';
import Table from '../../components/tables/TicketsTable';
import fetchTicketsAction from '../../redux/actions/ticket/fetchTickets';

const Dashboard = ({ fetchTicketsAction: fetchAction, fetchTickets }) => {
  const history = useHistory();
  const [status, setStatus] = useState('initial');
  const [resultsData, setResultsData] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('ZONDA_TOURS_TOKEN')) {
      return history.push('/');
    }

    if (status === 'initial') {
      fetchAction();
      setStatus('fetching');
    }

    if (fetchTickets.status === 'success') {
      setStatus('success');
      setResultsData(fetchTickets.results);
    }

    if (fetchTickets.status === 'error') {
      const { error } = fetchTickets;
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
  }, [fetchTickets]);

  const refetch = () => {
    fetchAction();
    setStatus('fetching');
  };

  const DisplayData = ({ children }) => {
    let data;
    switch (status) {
      case 'success':
        data = <>{children}</>;
        break;
      case 'fetching':
        data = <Loader marginTop="20%" />;
        break;
      case 'no_data':
        data = (
          <DisplayError
            title="No Data Found!"
            desc="No tickets registered yet!"
            marginTop="20%"
          />
        );
        break;
      case 'network_error':
        data = (
          <DisplayError
            title="No Internet Connection!"
            desc="Your network is slow / down, please try again later!"
            marginTop="20%"
          />
        );
        break;

      case 'unknown_error':
        data = (
          <DisplayError
            title="Unexpected Error!"
            desc="Oops! Something unexpected occured, please try again later."
            marginTop="20%"
          />
        );
        break;

      default:
        data = <Loader marginTop="20%" />;
        break;
    }
    return data;
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
            <h4 className=" font-weight-bold mt-4" style={{ fontSize: 18 }}>
              All Registered Tickets
            </h4>
            <div className="container-fluid mt-5">
              <DisplayData>
                <Table data={resultsData} refetch={refetch} />
              </DisplayData>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  fetchTicketsAction: PropTypes.func.isRequired,
  fetchTickets: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ fetchTickets }) => ({ fetchTickets });

export default connect(mapStateToProps, { fetchTicketsAction })(Dashboard);
