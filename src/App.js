import React from 'react';
import { Text } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import Toolbar from 'components/Toolbar';
import Login from 'views/Login';
import Ledger from 'views/Ledger';
import Wallets from 'views/Wallets';

function createStack(stackName, view) {
    return StackNavigator({
        [stackName]: {
            screen: view,
            navigationOptions: ({ navigation }) => {
                return {
                    header: (headerProps) => <Toolbar navigation={navigation} headerProps={headerProps}/>
                };
            }
        }
    });
}

const drawerRoutesConfig = [
    {
        stackName: 'ledger',
        view: Ledger
    },
    {
        stackName: 'wallets',
        view: Wallets
    }
].reduce((routesConfig, stackObj) => {
    routesConfig[stackObj.stackName] =  { screen: createStack(stackObj.stackName, stackObj.view) }
    return routesConfig;
}, {})

const App = DrawerNavigator(drawerRoutesConfig);

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

export default Root;
