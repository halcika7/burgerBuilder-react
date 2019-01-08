import React from 'react';

import classes from './Order.css';

const order = (props) => {
    const ingredients = [];

    for(let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            value: props.ingredients[ingredientName]
        });
    }

    const ingredientOutput = ingredients.map(ingredient => {
        return (
            <span 
            key={ingredient.name}
            className={classes.Span} >{ingredient.name} ({ingredient.value})</span>
        );
    });
    
    return(
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput} </p>
            <p>Price: <strong>USD {props.price}</strong></p>
        </div>
    );
};

export default order;