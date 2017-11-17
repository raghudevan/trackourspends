import React from 'react';
import { AppState, BackHandler, ToastAndroid } from 'react-native';
import { StackNavigator, DrawerNavigator, addNavigationHelpers } from 'react-navigation';
import { connect, Provider } from 'react-redux';

import createDrawerRoutes from '@utils/app-utils';
import { write } from '@utils/async-storage';
import createStore from '@store';

import Login from '@views/Login';
import Ledger from '@views/Ledger';
import CreateTransaction from '@views/CreateTransaction';
import Wallets from '@views/Wallets';

const drawerRoutesConfig = [
    {
        stackName: 'ledger',
        view: Ledger,
        children: [
            {
                name: 'create-transaction',
                view: CreateTransaction
            }
        ]
    },
    {
        stackName: 'wallets',
        view: Wallets
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
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('backBtnPressed', this._onBackBtnPress)
        AppState.removeEventListener('change', this._handleAppStateChange);
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

    _handleAppStateChange = (nextAppState) => {
        if (nextAppState.match(/inactive|background/)) {
            console.log(`going ${nextAppState}`)
            const { user, nav, ...appState } = store.getState();
            if (user) {
                write(user, appState)/*.then((isWriteSuccess) => {
                    console.log('isWriteSuccess', isWriteSuccess)
                });*/
            }
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
