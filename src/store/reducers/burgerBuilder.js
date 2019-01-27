import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const addRemoveIngredient = (state, action, type) => {
    let updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
    let updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    let updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    };

    if(type === '-') {
        updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
        updatedIngredients = updateObject(state.ingredients, updatedIngredient);
        updatedState = {
            ingredients: updatedIngredients,
            totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
            building: true
        };
    }

    return updateObject(state, updatedState);
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT :
            return addRemoveIngredient( state, action, '+');
        case actionTypes.REMOVE_INGREDIENT :
            return addRemoveIngredient( state, action, '-');
        case actionTypes.SET_INGREDIENTS :
            return updateObject(state, {ingredients: action.ingredients, totalPrice: 4, error: false,building: false});
        case actionTypes.FETCH_INGREDIENTS_FAILED :
            return updateObject(state, { error: true });
        default :
            return state;
    }
};

export default reducer;