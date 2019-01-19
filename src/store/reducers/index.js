import { combineReducers } from 'redux';
import burgerReducer from './burgerBuilder';
import orderReducer from './order';

export const combinedReducers = combineReducers({
    burgerBuilder: burgerReducer,
    order: orderReducer
});