import axios, { config } from '..';
import { UPDATE_TICKET_SUCCESS, UPDATE_TICKET_FAILED } from '../../actionTypes';

export default (body, id) => async (dispatch) => {
  try {
    const response = await axios.put(
      `/api/v1/tickets/update/${id}`,
      body,
      config
    );

    const {
      data: { message },
    } = response;

    dispatch({ type: UPDATE_TICKET_SUCCESS, message });
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
    dispatch({ type: UPDATE_TICKET_FAILED, error });
  }
};
