import React from 'react';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert, View, Text } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import * as loginActions from 'actions/login';
import styles from 'assets/styles';

class Login extends React.Component {

    componentDidMount() {
        this._setupGoogleSignin();
    }

    async _setupGoogleSignin() {
        await GoogleSignin.hasPlayServices({ autoResolve: true });
        await GoogleSignin.configure({
            scopes: ["https://www.googleapis.com/auth/drive.readonly"],
            webClientId: '649923802570-h0jd096fdervvj9698doti5aeocr8bg0.apps.googleusercontent.com',
            offlineAccess: false,
            forceConsentPrompt: false
        });

        const user = await GoogleSignin.currentUserAsync();
        this.props.actions.updateUser(user);
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
                <Text>
                    v{DeviceInfo.getVersion()}
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