import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GoogleSignin } from 'react-native-google-signin';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authActions from '@actions/authentication';

import powerIcon from "material-design-icons/action/1x_web/ic_power_settings_new_white_36dp.png"
import trashIcon from "material-design-icons/action/1x_web/ic_delete_white_36dp.png"
import syncIcon from 'material-design-icons/notification/1x_web/ic_sync_white_36dp.png';

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#448AFF',
    height: 56,
  },
});

/**
 * The toolbar contains
 * a button to bring the side nav bar into context
 * a title - where the user is currently
 * a <component> - username, etc.
 */
class Toolbar extends React.Component {

    openDrawer = () => {
        if (this.props.view.navigationOptions.hiddenView) {
            this.props.navigation.goBack();
        } else {
            this.props.navigation.navigate('DrawerToggle');
        }
    }

    onAction = async (position) => {
        switch(position) {
            case 0: {
                // logout
                let { user, appState } = this.props;
                await this.props.actions.logout(user, appState);
                this.props.navigation.navigate('login');
                break;
            }
            case 1: {
                // flush data
                let { user } = this.props;
                await this.props.actions.logout(user, null);
                this.props.navigation.navigate('login');
                break;
            }
        }
    }

    _isHiddenView = () => {
        return this.props.view.navigationOptions.hiddenView;
    }

    _makeActions = () => {
        let actions;
        if (this._isHiddenView()) {
            actions = [];
        } else {
            actions = [
                { title: 'Logout', show: 'never', icon: powerIcon },
                { title: 'FlushData', show: 'never', icon: trashIcon },
                { title: 'Sync', show: 'always', icon: syncIcon },
            ];
        }
        return actions;
    }

    render() {
        // icon name cheat sheet
        // https://github.com/oblador/react-native-vector-icons/blob/master/glyphmaps/Ionicons.json
        return(
            <Icon.ToolbarAndroid
                navIconName={this._isHiddenView() ? 'md-arrow-back' : 'md-menu'}
                iconColor="white"
                title={this.props.view.navigationOptions.drawerLabel}
                titleColor="white"
                style={styles.toolbar}
                onIconClicked={this.openDrawer}
                actions={this._makeActions()}
                onActionSelected={this.onAction}
            />
        );
    }
}

function mapStateToProps(state) {
    let { authentication, nav, ...appState } = state;
    return {
        user: authentication.user,
        appState,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);