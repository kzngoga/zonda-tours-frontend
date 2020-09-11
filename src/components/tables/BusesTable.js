import React from 'react';
import PropTypes from 'prop-types';
import UpdateBus from '../modals/UpdateBus';

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
              <tr key={elt._id}>
                <td>{index + 1}</td>
                <td>{elt.plateNo}</td>
                <td>{elt.seats}</td>
                <td>
                  <UpdateBus refetch={refetch} data={elt} id={elt._id} />
                </td>
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
