import { combineReducers } from 'redux';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  // Tambah reducer lain di sini jika diperlukan
});

export default rootReducer;