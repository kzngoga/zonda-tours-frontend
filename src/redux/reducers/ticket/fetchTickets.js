import {
  FETCH_TICKETS_SUCCESS,
  FETCH_TICKETS_FAILED,
  CLEAR_TICKETS_FAILED,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
  results: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TICKETS_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
        results: action.results,
      };

    case FETCH_TICKETS_FAILED:
      return { ...state, status: 'error', error: action.error };

    case CLEAR_TICKETS_FAILED:
      return { ...initialState, status: 'fetch_buses_clear' };
    default:
      return state;
  }
};
