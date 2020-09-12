import {
  UPDATE_TICKET_SUCCESS,
  UPDATE_TICKET_FAILED,
  CLEAR_UPDATE_TICKET,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TICKET_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
      };
    case UPDATE_TICKET_FAILED:
      return {
        ...state,
        status: 'error',
        error: action.error,
      };
    case CLEAR_UPDATE_TICKET:
      return { ...initialState, status: 'clear' };
    default:
      return state;
  }
};
