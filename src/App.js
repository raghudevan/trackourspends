import React from 'react';
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
    render() {
        return(
            <Provider store={store}>
                <Root/>
            </Provider>
        );
    }
}

export default StatefulApp;
