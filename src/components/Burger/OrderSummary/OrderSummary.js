import React from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
        return (
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}:</span> {props.ingredients[igKey]}
            </li>);
    });
    return (
        <div>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total price: <strong>{props.price} $</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger"
                    clicked={props.modalClosed}>CANCLE</Button>
            <Button btnType="Success"
                    clicked={props.continue}>CONTINUE</Button>
        </div>
    );
};

export default orderSummary;