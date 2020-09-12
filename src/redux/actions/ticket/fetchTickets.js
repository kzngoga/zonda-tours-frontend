import axios, { config } from '..';
import {
  FETCH_TICKETS_SUCCESS,
  FETCH_TICKETS_FAILED,
  CLEAR_TICKETS_FAILED,
  CLEAR_DELETE_TICKETS,
  CLEAR_UPDATE_TICKET,
} from '../../actionTypes';

export default () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_DELETE_TICKETS,
    });

    dispatch({
      type: CLEAR_UPDATE_TICKET,
    });

    dispatch({
      type: CLEAR_TICKETS_FAILED,
    });

    const response = await axios.get('/api/v1/tickets/all', config);

    const {
      data: { message, data },
    } = response;
    dispatch({
      type: FETCH_TICKETS_SUCCESS,
      message,
      results: data,
    });
  } catch (err) {
    let error = {};
    if (err.response) {
      const {
        data: { status, message },
      } = err.response;
      error = { status, message };
    } else {
      error = { status: '500', message: err.message };
    }
    dispatch({ type: FETCH_TICKETS_FAILED, error });
  }
};
