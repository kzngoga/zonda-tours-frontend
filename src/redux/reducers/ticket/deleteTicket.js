import {
  DELETE_TICKETS_SUCCESS,
  DELETE_TICKETS_FAILED,
  CLEAR_DELETE_TICKETS,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DELETE_TICKETS_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
      };
    case DELETE_TICKETS_FAILED:
      return { ...state, status: 'error', error: action.error };
    case CLEAR_DELETE_TICKETS:
      return {
        ...initialState,
        status: 'clear',
      };
    default:
      return state;
  }
}
