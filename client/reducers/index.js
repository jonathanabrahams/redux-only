import { combineReducers } from 'redux';
import counter from './counter';
import notify from './notify';

export default combineReducers({
    notify,
    counter
})