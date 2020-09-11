import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ data = [], refetch }) => {
  return (
    <div className="mt-5">
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">N0.</th>
              <th scope="col">Customer Names</th>
              <th scope="col">Bus</th>
              <th scope="col">Destination</th>
              <th scope="col">Departure Time</th>
              <th scope="col">Seat N0.</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((elt, index) => (
              <tr key={elt._id}>
                <td>{index + 1}</td>
                <td>{elt.customerName}</td>
                <td>{elt.bus.plateNo}</td>
                <td>{elt.seatNo}</td>
                <td>{elt.destination}</td>
                <td>{elt.time}</td>
                <td>Edit</td>
                <td>Delete</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    )
  ).isRequired,
  refetch: PropTypes.func.isRequired,
};
export default Table;
