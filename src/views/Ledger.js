import React from 'react';
import { View, Text, StyleSheet, BackHandler } from 'react-native';

import styles from 'assets/styles';

export default class Ledger extends React.Component {

    static navigationOptions = {
        drawerLabel: "Ledger"
    }

    componentWillMount() {
        BackHandler.addEventListener('onBackPress', () => {
            BackHandler.exitApp();
        });
    }

    render() {
        return(
            <View style={styles.center}>
                <Text>
                    Welcome to the Ledger Screen!
                </Text>
            </View>
        );
    }
}