import React from 'react';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert, View, Text } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import * as loginActions from 'actions/login';
import * as asyncStorageActions from 'actions/async-storage';
import styles from 'assets/styles';

class Login extends React.Component {

    componentWillMount() {
        this._setupGoogleSignin();
    }

    async _setupGoogleSignin() {
        try {
            await GoogleSignin.hasPlayServices({ autoResolve: true });
            await GoogleSignin.configure({
                scopes: ["https://www.googleapis.com/auth/drive.readonly"],
                webClientId: '649923802570-s4v2vh63otqgk008ne8kl136ghodsu6v.apps.googleusercontent.com',
                offlineAccess: false,
                forceConsentPrompt: false
            });

            const user = await GoogleSignin.currentUserAsync();
            if(user) {
                this._postLogin();
            }
        } catch(exception) {
            Alert.alert(
                'Warning',
                `Some exception: ${exception.message}`,
                [
                    { text: 'OK' }
                ]
            )
        }
    }

    _postLogin = (user) => {
        this.props.actions.updateUser(user);
        // this.props.actions.read(user.id);
        this.props.navigation.navigate('ledger');
    }

    _signIn = () => {
        GoogleSignin.signIn()
        .then((user) => {
            this._postLogin();
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
                <Text>
                    v{DeviceInfo.getVersion()}
                </Text>
                <GoogleSigninButton
                    ref="signInBtn"
                    style={{width: 230, height: 48}}
                    size={GoogleSigninButton.Size.Standard}
                    color={GoogleSigninButton.Color.Dark}
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
        actions: bindActionCreators({ ...loginActions, ...asyncStorageActions }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);