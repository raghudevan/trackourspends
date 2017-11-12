import React from 'react';
import { BackHandler, ToastAndroid } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import createDrawerRoutes from './app-utils';
import createStore from 'store';

import Login from 'views/Login';
import Ledger from 'views/Ledger';
import Wallets from 'views/Wallets';

const drawerRoutesConfig = [
    {
        stackName: 'ledger',
        view: Ledger
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

const store = createStore();

class StatefulApp extends React.Component {

    constructor() {
        super();
        this.timeout = null;
    }

    componentDidMount() {
        BackHandler.addEventListener('onBackPress', this._handleBackBtnPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('onBackPress', this._handleBackBtnPress);
    }

    _handleBackBtnPress = () => {
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
        return(
            <Provider store={store}>
                <Root/>
            </Provider>
        );
    }
}

export default StatefulApp;
