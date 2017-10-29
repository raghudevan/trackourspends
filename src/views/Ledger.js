import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Ledger extends React.Component {

    static navigationOptions = {
        drawerLabel: "Ledger"
    }

    render() {
        return(
            <View>
                <Text>
                    Welcome to the Ledger Screen!
                </Text>
            </View>
        );
    }
}