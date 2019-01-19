import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import wirhErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';
import axios from '../../axios-orders';


class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    componentDidMount() {
        this.props.onInitiIngredients()
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancleHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(item => {
            return ingredients[item];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sum > 0;
    }

    render() {
        if( !this.props.ings ){
        return <div>{this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />}</div>;
        }
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = <OrderSummary 
                            ingredients={this.props.ings}
                            modalClosed={this.purchaseCancleHandler}
                            continue={this.purchaseContinueHandler}
                            price={this.props.price.toFixed(2)}/>;
        return (
            <div>
                <Modal 
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancleHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.props.ings} />
                <BuildControls 
                    addIngredient={this.props.onIngredientAdded} 
                    removeIng={this.props.onIngredientRemoved}
                    price={this.props.price.toFixed(2)}
                    disable={disabledInfo}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitiIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(wirhErrorHandler(BurgerBuilder,axios));