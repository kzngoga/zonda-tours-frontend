/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable operator-linebreak */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import $ from 'jquery';
import deleteTicketsAction from '../../redux/actions/ticket/deleteTicket';

const Modal = ({
  deleteTicketsAction: deleteTickets,
  deleteTickets: deletedTickets,
  refetch,
  id,
}) => {
  const [errors, setErrors] = useState('');
  const [status, setStatus] = useState('');
  const [trigger, setTrigger] = useState(true);

  useEffect(() => {
    if (deletedTickets.status === 'success') {
      $(`#deleteTicket${id}`).modal('hide');
      setStatus('success');
      setErrors('');
      if (trigger) {
        console.log('Yessssss');
        refetch();
        console.log(refetch());
        setTrigger(false);
      }
    }
    if (deletedTickets.status === 'error') {
      setStatus('');
      return setErrors(deletedTickets.error.message);
    }
    return undefined;
  }, [deletedTickets]);
  const handleSubmit = () => {
    setErrors('');
    setStatus('deleting');
    return deleteTickets(id);
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-danger"
        data-toggle="modal"
        data-target={`#deleteTicket${id}`}
      >
        <FontAwesomeIcon icon={['fas', 'trash-alt']} />
      </button>
      <div
        className="modal fade"
        id={`deleteTicket${id}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="deleteTicket"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content border-0 artist-modal">
            <div className="modal-header">
              <h4
                className="section-title p-0 m-0 text-dark text-center mx-auto font-weight-bold"
                style={{ fontSize: 20.7 }}
              >
                Confirm Action
              </h4>
              <span
                data-dismiss="modal"
                className="close-button cursor-pointer text-center text-dark"
                style={{ cursor: 'pointer' }}
              >
                &times;
              </span>
            </div>
            <div className="modal-body">
              <p className="text-center mt-4">
                Are you sure you want to delete this Ticket?
              </p>
              <div className="text-right mt-4">
                <button
                  type="button"
                  className="btn btn-danger px-4 py-1 mr-2"
                  data-dismiss="modal"
                  style={{ borderRadius: 5 }}
                >
                  Cancel
                </button>
                {status === 'deleting' ? (
                  <button
                    type="button"
                    className="text-white btn btn-secondary px-4 py-1 cursor-disabled"
                    disabled
                  >
                    Deleting
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-success px-4 py-1"
                    style={{ borderRadius: 5 }}
                    onClick={handleSubmit}
                  >
                    Proceed
                  </button>
                )}
                <p className="mt-3 text-danger text-center">{errors}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
Modal.propTypes = {
  id: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired,
  deleteTicketsAction: PropTypes.func.isRequired,
  deleteTickets: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};
const mapStateToProps = ({ deleteTickets }) => ({
  deleteTickets,
});
export default connect(mapStateToProps, { deleteTicketsAction })(Modal);
