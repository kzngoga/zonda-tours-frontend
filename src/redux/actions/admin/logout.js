import { USERS_LOG_OUT } from '../../actionTypes';

export default () => async (dispatch) => {
  dispatch({
    type: USERS_LOG_OUT,
  });
};
