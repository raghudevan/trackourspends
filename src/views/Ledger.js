import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

import ActionButton from 'react-native-action-button';
import styles from '@assets/styles';

export default class Ledger extends React.Component {

    static navigationOptions = {
        drawerLabel: "Ledger"
    }

    _addTransaction = () => {
        // navigate to the transaction screen
        this.props.navigation.navigate('create-transaction');
    }

    render() {
        return(
            <View style={styles.center}>
                <Text>
                    Welcome to the Ledger Screen!
                </Text>

                <ActionButton
                    position="right"
                    offsetX={30}
                    offsetY={30}
                    buttonColor="rgba(231,76,60,1)"
                    onPress={this._addTransaction}
                />
            </View>
        );
    }
}