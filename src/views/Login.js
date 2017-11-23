import React from 'react';
import { GoogleSigninButton } from 'react-native-google-signin';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert, View, Text } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import * as authActions from '@actions/authentication';
import styles from '@assets/styles';

class Login extends React.Component {

    componentDidMount() {
        this.props.actions.init().then(isUserAlreadyPresent => {
            if (isUserAlreadyPresent) {
                this._navigateToLedger();
            }
        });
    }

    _navigateToLedger = () => {
        this.props.navigation.navigate('ledger');
        this.refs.signInBtn._clickListener.remove();
    }

    _signIn = () => {
        this.props.actions.login().then(isSuccess => {
            if (isSuccess) {
                this._navigateToLedger();
            }
        })
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
        actions: bindActionCreators(authActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);