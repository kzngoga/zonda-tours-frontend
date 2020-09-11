import {
  FETCH_BUSES_SUCCESS,
  FETCH_BUSES_FAILED,
  CLEAR_BUSES_FAILED,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
  results: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BUSES_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
        results: action.results,
      };

    case FETCH_BUSES_FAILED:
      return { ...state, status: 'error', error: action.error };

    case CLEAR_BUSES_FAILED:
      return { ...initialState, status: 'fetch_buses_clear' };
    default:
      return state;
  }
};
