/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SideBar from '../../components/Sidebar';
import StatCard from '../../components/StatCard';
import fetchBusesAction from '../../redux/actions/bus/fetchBuses';
import fetchTicketsAction from '../../redux/actions/ticket/fetchTickets';

const Dashboard = ({
  fetchBusesAction: busesAction,
  fetchBuses,
  fetchTicketsAction: ticketsAction,
  fetchTickets,
}) => {
  const history = useHistory();
  const [status, setStatus] = useState('initial');
  const [ticketStatus, setTicketStatus] = useState('initial');

  useEffect(() => {
    if (!localStorage.getItem('ZONDA_TOURS_TOKEN')) {
      return history.push('/');
    }

    if (status === 'initial') {
      busesAction();
      setStatus('fetching');
    }

    if (ticketStatus === 'initial') {
      ticketsAction();
      setTicketStatus('fetching');
    }

    if (fetchBuses.status === 'success') {
      setStatus('success');
    }

    if (fetchBuses.status === 'error') {
      const { error } = fetchBuses;
      if (error.status === '404') {
        setStatus('no_data');
      }
    }

    //Tickets
    if (fetchTickets.status === 'success') {
      setTicketStatus('success');
    }

    if (fetchTickets.status === 'error') {
      const { error } = fetchTickets;
      if (error.status === '404') {
        setTicketStatus('no_data');
      }
    }

    return undefined;
  }, [fetchBuses, fetchTickets]);

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
              Quick Statistics
            </h4>
            <div className="container-fluid mt-5">
              <div className="row">
                <StatCard
                  title="All Buses"
                  count={
                    status === 'no_data'
                      ? 0
                      : status === 'success'
                      ? fetchBuses.results.length
                      : '-'
                  }
                  iconHead="fas"
                  icon="bus-alt"
                />
                <StatCard
                  title="Reserved Tickets"
                  count={
                    status === 'no_data'
                      ? 0
                      : ticketStatus === 'success'
                      ? fetchTickets.results.length
                      : '-'
                  }
                  iconHead="fas"
                  icon="ticket-alt"
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  fetchBusesAction: PropTypes.func.isRequired,
  fetchBuses: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchTicketsAction: PropTypes.func.isRequired,
  fetchTickets: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ fetchBuses, fetchTickets }) => ({
  fetchBuses,
  fetchTickets,
});

export default connect(mapStateToProps, {
  fetchBusesAction,
  fetchTicketsAction,
})(Dashboard);
