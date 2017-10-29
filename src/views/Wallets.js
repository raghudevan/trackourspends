import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Toolbar from 'components/Toolbar';
import styles from 'assets/styles';

export default class Home extends React.Component {

    static navigationOptions = {
        drawerLabel: "Wallets"
    }

    render() {
        return(
            <View style={styles.center}>
                <Text>
                    The Wallets page is WIP!
                </Text>
            </View>
        );
    }
}