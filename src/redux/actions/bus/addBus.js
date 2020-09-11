import axios, { config } from '..';
import { ADD_BUS_SUCCESS, ADD_BUS_FAILED } from '../../actionTypes';

export default (body) => async (dispatch) => {
  try {
    const response = await axios.post('/api/v1/bus/new', body, config);

    const {
      data: { message },
    } = response;

    dispatch({ type: ADD_BUS_SUCCESS, message });
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
    dispatch({ type: ADD_BUS_FAILED, error });
  }
};
