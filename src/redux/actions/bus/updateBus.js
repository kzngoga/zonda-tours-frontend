import axios, { config } from '..';
import { UPDATE_BUS_SUCCESS, UPDATE_BUS_FAILED } from '../../actionTypes';

export default (body, id) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/v1/bus/update/${id}`, body, config);

    const {
      data: { message },
    } = response;

    dispatch({ type: UPDATE_BUS_SUCCESS, message });
  } catch (err) {
    let error = {};
    if (err.response) {
      const {
        data: { message, status },
      } = err.response;
      error = { message, status };
    } else {
      error = {
        message: err.message,
        status: '500',
      };
    }
    dispatch({ type: UPDATE_BUS_FAILED, error });
  }
};
