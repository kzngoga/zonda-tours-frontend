import { combineReducers } from 'redux';

import admin from './admin';
import bus from './bus';
import ticket from './ticket';

export default combineReducers({ ...admin, ...bus, ...ticket });
