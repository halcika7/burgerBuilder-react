import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import wirhErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const Ingredient_prices = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancleHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert('You made order successfuly');
        // this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice.toFixed(2) + "$",
        //     customer: {
        //         name: 'Haris Beslic',
        //         address: {
        //             street: 'Some Street 1',
        //             zipCode: '123456',
        //             country: 'Bosnia and Herzegovina'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }

        // axios.post('/orders.json', order)
        //     .then( response => {
        //         this.setState({loading: false, purchasing: false});
        //     })
        //     .catch( err => {
        //         this.setState({loading: false, purchasing: false});
        //         console.log(err);
        //     } );
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(item => {
            return ingredients[item];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        this.setState({purchasable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;
        const priceAddition = Ingredient_prices[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){return;}
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = Ingredient_prices[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

        this.updatePurchaseState(updatedIngredients);
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary =<OrderSummary 
                            ingredients={this.state.ingredients}
                            modalClosed={this.purchaseCancleHandler}
                            continue={this.purchaseContinueHandler}
                            price={this.state.totalPrice.toFixed(2)}/>;
        if(this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <div>
                <Modal show={this.state.purchasing}
                modalClosed={this.purchaseCancleHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls addIngredient={this.addIngredientHandler} 
                               removeIng={this.removeIngredientHandler}
                               price={this.state.totalPrice.toFixed(2)}
                               disable={disabledInfo}
                               purchasable={this.state.purchasable}
                               ordered={this.purchaseHandler}/>
            </div>
        );
    }
}

export default wirhErrorHandler(BurgerBuilder, axios);