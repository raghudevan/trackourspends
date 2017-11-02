import React from 'react';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert, View, Text } from 'react-native';

import * as loginActions from 'actions/login';
import styles from 'assets/styles';

class Login extends React.Component {

    constructor() {
        super();
    }

    componentWillMount() {
        GoogleSignin.hasPlayServices({ autoResolve: true })
        .then(() => {
            // play services are available, can now configure library
            return GoogleSignin.configure({
                webClientId: '649923802570-l5l9v7v7qcstk8ja681a3rqm4d65ktac.apps.googleusercontent.com',
                forceConsentPrompt: false
            });
        }, (err) => {
            console.log('Play services error', err.code, err.message);
        });
    }

    componentDidMount() {
        GoogleSignin.currentUserAsync()
        .then((user) => {
            this.props.actions.updateUser(user);
        }, (err) => {
            console.log('Unable to get currentAsyncUser', err.code, err.message);
            Alert.alert(
                'Error',
                err.message,
                [
                    { text: 'OK' }
                ]
            );
        });
    }

    _signIn = () => {
        GoogleSignin.signIn()
        .then((user) => {
            this.props.actions.updateUser(user);
            this.props.navigation.navigate('ledger');
            this.refs.signInBtn._clickListener.remove();
        }, (err) => {
            Alert.alert(
                'Error',
                 `Code: ${err.code}\nMessage: ${err.message}`,
                 [
                    { text: 'OK' }
                 ]
            );
        });
    }

    render() {
        return(
            <View style={styles.center}>
                <Text style={styles.appName}>
                    Track Our Spends
                </Text>
                <GoogleSigninButton
                    ref="signInBtn"
                    style={{width: 312, height: 48}}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Light}
                    onPress={this._signIn}
                />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(loginActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);