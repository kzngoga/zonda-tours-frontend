import { ADD_BUS_SUCCESS, ADD_BUS_FAILED } from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUS_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
      };
    case ADD_BUS_FAILED:
      return {
        ...state,
        status: 'error',
        error: action.error,
      };
    default:
      return state;
  }
};
