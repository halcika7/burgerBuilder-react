import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, token) => async dispatch => {
    try {
        dispatch(purchaseBurgerStart());
        const response = await axios.post('/orders.json?auth=' + token, orderData);
        dispatch({
            type: actionTypes.PURCHASE_BURGER_SUCCESS,
            orderId: response.data.name,
            orderData
        });
    }catch(error) {
        dispatch({type: actionTypes.PURCHASE_BURGER_FAIL, error});
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchOrders = (token, userId) => async dispatch => {
    try {
        dispatch({ type: actionTypes.FETCH_ORDERS_START });
        const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`; 
        const response = await axios.get('/orders.json' + queryParams);
        const fetchedOrders = [];
        for(let key in response.data){
            fetchedOrders.push({
                ...response.data[key],
                id:key
            });
        }
        dispatch({
            type: actionTypes.FETCH_ORDERS_SUCCESS,
            orders: fetchedOrders
        });
    }catch(error) {
        dispatch({type: actionTypes.FETCH_ORDERS_FAIL, error});
    }
}