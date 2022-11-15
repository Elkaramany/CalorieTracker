import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import MealsReducer from './MealsReducer';

export default combineReducers({
    AuthReducer,
    MealsReducer,
})