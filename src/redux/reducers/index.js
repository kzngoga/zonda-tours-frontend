import { combineReducers } from 'redux';

import admin from './admin';
import bus from './bus';

export default combineReducers({ ...admin, ...bus });
