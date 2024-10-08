import { ADD_TICKET_SUCCESS, ADD_TICKET_FAILED } from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TICKET_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
      };
    case ADD_TICKET_FAILED:
      return {
        ...state,
        status: 'error',
        error: action.error,
      };
    default:
      return state;
  }
};
