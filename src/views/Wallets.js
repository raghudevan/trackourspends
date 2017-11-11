import React from 'react';
import { View, Text, StyleSheet,TextInput, Button,TouchableHighlight } from 'react-native';
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

    loadWallets() {
        alert('First save lah!!')
    }

    render() {
        return(
            <View style={styles.container}>
                <Form
                    ref="walletForm"
                    type={Wallet}
                    options={{}}
                />

                <TouchableHighlight style={styles.button} onPress={this.addWallet} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>+ Add Wallet</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.button} onPress={this.loadWallets} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Load Wallets</Text>
                </TouchableHighlight>
            </View>
        );
    }
}
