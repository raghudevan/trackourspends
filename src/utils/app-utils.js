import React from 'react';
import { StackNavigator } from 'react-navigation';

import Toolbar from '@components/Toolbar';

function createStack({ stackName, view, children = [] }) {
    let routesConfig = {
        [stackName]: {
            screen: view,
            navigationOptions: ({ navigation }) => {
                return {
                    header: (headerProps) =>
                    <Toolbar
                        navigation={navigation}
                        headerProps={headerProps}
                        view={view}
                    />
                };
            }
        }
    };

    children.forEach(child => {
        routesConfig[child.name] = {
            screen: child.view,
            navigationOptions: ({ navigation }) => {
                return {
                    header: (headerProps) =>
                    <Toolbar
                        navigation={navigation}
                        headerProps={headerProps}
                        view={child.view}
                    />
                };
            }
        }
    });

    return StackNavigator(routesConfig)
}

export default function createDrawerRoutes(config) {
    return config.reduce((routesConfig, stackObj) => {
        routesConfig[stackObj.stackName] =  { screen: createStack(stackObj) }
        return routesConfig;
     }, {});
}