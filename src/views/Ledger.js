import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import styles from 'assets/styles';

export default class Ledger extends React.Component {

    static navigationOptions = {
        drawerLabel: "Ledger"
    }

    componentDidMount() {
        // dump data from AsyncStorage into redux state
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