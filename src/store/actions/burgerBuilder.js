import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingredientName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName
    }
}

export const removeIngredient = (ingredientName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};

export const initIngredients = () => async dispatch => {
    try{
        const response = await axios.get('https://react-my-burger-49530.firebaseio.com/ingredients.json');
        dispatch({type: actionTypes.SET_INGREDIENTS, ingredients: response.data});
    } catch(err) {
        dispatch(fetchIngredientsFailed());
    }
};