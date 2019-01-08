import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [...this.state.orders];
                for(let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id:key
                    });
                }
                this.setState({orders: fetchedOrders, loading: false});
            })
            .catch(err => {
                this.setState({loading: false});
            });
    }

    render() {
        let orders = this.state.orders.map( (order,index) => {
            return (<Order key={order.id} {...order}/>);
        } )
        return(
            <div>
                {orders}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);