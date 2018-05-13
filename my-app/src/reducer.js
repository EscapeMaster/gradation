import { combineReducers } from 'redux';
import { user } from './redux/user_redux'
import {chatuser} from './redux/chatuser_redux'
export default combineReducers({user,chatuser});