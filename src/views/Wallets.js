import React from 'react';
import { View, Text, StyleSheet,TextInput, Button } from 'react-native';
var t = require('tcomb-form-native');

import Toolbar from 'components/Toolbar';
import styles from 'assets/styles';

let Form = t.form.Form;

let Wallet = t.struct({
  walletName: t.String,              // a required string
});

export default class Home extends React.Component {

    static navigationOptions = {
        drawerLabel: "Wallets"
    }

    constructor(props) {
        super(props);
        this.state = {
            walletName: ''
        };
    }

    addWallet() {
        alert('Saved lah!!')
    }

    render() {
        return(
            <View style={styles.container}>
                <Form
                    ref="walletForm"
                    type={Wallet}
                    options={{}}
                />

                <Button
                    onPress={this.addWallet}
                    title="+ Add Wallet"
                    style={styles.button}
                    accessibilityLabel="Click to Add Wallet"
                />
            </View>
        );
    }
}
