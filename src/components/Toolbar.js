import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GoogleSignin } from 'react-native-google-signin';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '@actions/user';

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
                try {
                    await GoogleSignin.signOut(this.props.user);
                    await this.props.actions.saveUserData(this.props.user, this.props.appState);
                    this.props.navigation.navigate('login');
                } catch (exception) {
                    console.log('unable to save user data at the moment');
                }
                break;
            }
            case 1: {
                // flush data
                try {
                    await GoogleSignin.signOut(this.props.user);
                    await this.props.actions.saveUserData(this.props.user, {});
                    this.props.navigation.navigate('login');
                } catch (exception) {
                    console.log('unable to save user data at the moment');
                }
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
    let { user, nav, ...appState } = state;
    return {
        user,
        appState,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);