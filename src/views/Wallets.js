import React from 'react';
import { View, Text } from 'react-native';

import Toolbar from 'components/Toolbar';
//import styles from 'assets/styles';

export default class Home extends React.Component {

    static navigationOptions = {
        drawerLabel: "Wallets"
    }

    render() {
        return(
            <View>
                <Toolbar
                    hostContext={this}
                    host={Home}
                />
                <Text>
                    Wallets
                </Text>
            </View>
        );
    }
}