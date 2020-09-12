import axios, { config } from '..';
import {
  DELETE_TICKETS_SUCCESS,
  DELETE_TICKETS_FAILED,
} from '../../actionTypes';

export default (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`/api/v1/tickets/delete/${id}`, config);
    const {
      data: { message },
    } = response;

    dispatch({
      type: DELETE_TICKETS_SUCCESS,
      message,
    });
  } catch (err) {
    let error = {};
    if (err.response) {
      const {
        data: { status, message },
      } = err.response;
      error = { status, message };
    } else {
      error = {
        status: 500,
        message: err.message,
      };
    }
    dispatch({ type: DELETE_TICKETS_FAILED, error });
  }
};
