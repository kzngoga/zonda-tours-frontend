import {
  UPDATE_BUS_SUCCESS,
  UPDATE_BUS_FAILED,
  CLEAR_UPDATE_BUS,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_BUS_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
      };
    case UPDATE_BUS_FAILED:
      return {
        ...state,
        status: 'error',
        error: action.error,
      };
    case CLEAR_UPDATE_BUS:
      return { ...initialState, status: 'clear' };
    default:
      return state;
  }
};
