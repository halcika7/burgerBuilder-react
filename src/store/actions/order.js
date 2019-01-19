import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => async dispatch => {
    try {
        dispatch(purchaseBurgerStart());
        const response = await axios.post('/orders.json', orderData);
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