import React from 'react';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

export default class Login extends React.Component {

    _signIn = () => {
        this.props.navigation.navigate('ledger');
    }

    render() {
        return(
            <GoogleSigninButton
                style={{width: 312, height: 48}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={this._signIn}
            />
        );
    }
}