import React from 'react';
import { BackHandler, ToastAndroid } from 'react-native';
import { StackNavigator, DrawerNavigator, addNavigationHelpers } from 'react-navigation';
import { connect, Provider } from 'react-redux';

import createDrawerRoutes from './app-utils';
import createStore from 'store';

import Login from 'views/Login';
import Ledger from 'views/Ledger';
import Wallets from 'views/Wallets';

const drawerRoutesConfig = [
    {
        stackName: 'ledger',
        view: Ledger
    }
];

const App = DrawerNavigator(
    createDrawerRoutes(drawerRoutesConfig),
    {
        contentOptions: {
            labelStyle: {
                width: '100%'
            }
        }
    }
);

// App is a DrawerNavigator that contains StackNavs
// at each route
const Root = StackNavigator({
    login: {
        screen: Login,
    },
    app: {
        screen: App,
    }
}, {
    headerMode: 'none'
});

const initialState = Root.router.getStateForAction(Root.router.getActionForPathAndParams('login'));
const navReducer = (state = initialState, action) => {
    const nextState = Root.router.getStateForAction(action, state);
    return nextState || state;
}

const store = createStore({ nav: navReducer });

class RootWithNavigationState extends React.Component {
    makeNavigation = () => {
        return addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.nav
        });
    }

    render() {
        return (
            <Root navigation={this.makeNavigation()} />
        );
    }
}

const mapStateToProps = (state) => ({ nav: state.nav });

const ConnectedRootWithNavigationState = connect(mapStateToProps)(RootWithNavigationState);

class StatefulApp extends React.Component {

    constructor() {
        super();
        this.timeout = null;
    }

    componentDidMount() {
        BackHandler.addEventListener('backBtnPressed', this._onBackBtnPress)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('backBtnPressed', this._onBackBtnPress)
    }

    _onBackBtnPress = () => {
        if (this.timeout) {
            this.timeout = null;
            BackHandler.exitApp();
        } else {
            ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
            this.timeout = setTimeout(() => this.timeout = null, 1000);
            return true;
        }
    }

    render() {
        return (
            <Provider store={store}>
                <ConnectedRootWithNavigationState />
            </Provider>
        );
    }
}

export default StatefulApp;
