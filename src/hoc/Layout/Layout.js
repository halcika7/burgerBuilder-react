import React, { Component } from 'react';
import Navigation from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.css';

class Layout extends Component{
    state = {
        showeSideDrawer: false
    }
    
    sideDrawerCloseHandler = () => {
        this.setState({showeSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showeSideDrawer: !prevState.showeSideDrawer};
        });
    }

    render() {
        return (
            <div>
                <Navigation 
                        drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer 
                        open={this.state.showeSideDrawer} 
                        closed={this.sideDrawerCloseHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </div>
        );
    }
};

export default Layout;