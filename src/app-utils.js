import React from 'react';
import { StackNavigator } from 'react-navigation';

import Toolbar from 'components/Toolbar';

function createStack({ stackName, view }) {
    return StackNavigator({
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
    });
}

export function makeStatefulApp() {
    return class StatefulApp extends React.Component {

    }
}

export default function createDrawerRoutes(config) {
    return config.reduce((routesConfig, stackObj) => {
         routesConfig[stackObj.stackName] =  { screen: createStack(stackObj) }
         return routesConfig;
     }, {});
}