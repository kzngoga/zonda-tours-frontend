import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Table = ({ data = [], refetch }) => {
  return (
    <div className="mt-5">
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">N0.</th>
              <th scope="col">Bus Plate N0.</th>
              <th scope="col">N0. of Seats</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            {data.map((elt, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{elt.plateNo}</td>
                <td>{elt.seats}</td>
                <td>Edit</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Table.propTypes = {
  resultsData: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    )
  ).isRequired,
  refetch: PropTypes.func.isRequired,
};
export default Table;
