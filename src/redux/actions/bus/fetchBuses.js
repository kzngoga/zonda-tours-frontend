import axios, { config } from '..';
import {
  FETCH_BUSES_SUCCESS,
  FETCH_BUSES_FAILED,
  CLEAR_BUSES_FAILED,
} from '../../actionTypes';

export default () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_BUSES_FAILED,
    });

    const response = await axios.get('/api/v1/bus/all', config);

    const {
      data: { message, data },
    } = response;
    dispatch({
      type: FETCH_BUSES_SUCCESS,
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
    dispatch({ type: FETCH_BUSES_FAILED, error });
  }
};
