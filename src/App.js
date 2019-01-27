import React, {Component, Suspense, lazy} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import Spinner from './components/UI/Spinner/Spinner';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';

const Checkout = lazy(() => import('./containers/Checkout/Checkout'));
const Orders = lazy(() => import('./containers/Orders/Orders'));
const Auth = lazy(() => import('./containers/Auth/Auth'));

class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {

        let routes = (
            <Switch>
                <Route path="/auth" 
                    render={() => <Suspense fallback={<Spinner />}><Auth /></Suspense>}/>
                <Route path="/" exact component={BurgerBuilder}/>
                <Redirect to="/" />
            </Switch>
        );

        if(this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/checkout" 
                        render={() => <Suspense fallback={<Spinner />}><Checkout {...this.props}/></Suspense>}/>
                    <Route path="/orders" 
                        render={() => <Suspense fallback={<Spinner />}><Orders /></Suspense>}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/auth" 
                        render={() => <Suspense fallback={<Spinner />}><Auth /></Suspense>}/>
                    <Route path="/" exact component={BurgerBuilder}/>
                </Switch>
            );
        }

        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
