import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Toolbar from 'components/Toolbar';

export default class Ledger extends React.Component {

    static navigationOptions = {
        drawerLabel: "Ledger"
    }

    render() {
    debugger
        return(
            <View>
                <Toolbar
                    hostContext={this}
                    host={Ledger}
                />
                <Text>
                    Welcome to the Ledger Screen!
                </Text>
            </View>
        );
    }
}