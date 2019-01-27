import { combineReducers } from 'redux';
import burgerReducer from './burgerBuilder';
import orderReducer from './order';
import authReducer from './auth';

export const combinedReducers = combineReducers({
    burgerBuilder: burgerReducer,
    order: orderReducer,
    auth: authReducer
});