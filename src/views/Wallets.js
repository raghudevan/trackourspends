import React from 'react';
import { View, Text, StyleSheet, AsyncStorage, TouchableHighlight } from 'react-native';
import tcomb from 'tcomb-form-native';

import Toolbar from 'components/Toolbar';
import styles from 'assets/styles';

let Form = tcomb.form.Form;
let Wallet = tcomb.struct({
  walletName: tcomb.String,              // a required string
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

    async addWallet() {
        let walletFormValue = this.refs.form.getValue();
        if(walletFormValue !== null) {
            try {
                // Refactor this to actions
                let wallets = await AsyncStorage.getItem('trackOurSpends-wallets');

                try {
                    wallets = JSON.parse(wallets)
                } catch(e) {

                }

                let arrayToSave = Array.isArray(wallets)? wallets : [];
                arrayToSave.push(walletFormValue.walletName);
                await AsyncStorage.setItem('trackOurSpends-wallets', JSON.stringify(arrayToSave));
                alert('Saved new wallet to disk: ' + walletFormValue.walletName);
            } catch (error) {
                alert('AsyncStorage error: ' + error.message);
            }
        }
    }

    async loadWallets() {
        try {
            // Refactor this to reducer
            let value = await AsyncStorage.getItem('trackOurSpends-wallets');
            if (value !== null){
                alert('Recovered wallet from disk: ' + value);
            } else {
                alert('No Wallets saved');
            }
        } catch (error) {
            alert('AsyncStorage error: ' + error.message);
        }
    }

    render() {
        return(
            <View style={styles.container}>
                {/* display */}
                <Form
                    ref="form"
                    type={Wallet}
                    options={{}}
                />

                <TouchableHighlight style={styles.button} onPress={this.addWallet.bind(this)} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>+ Add Wallet</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.button} onPress={this.loadWallets.bind(this)} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Load Wallets</Text>
                </TouchableHighlight>
            </View>
        );
    }
}
