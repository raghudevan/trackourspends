import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
export default class Toolbar extends React.Component {

    openDrawer = () => {
        this.props.navigation.navigate('DrawerToggle')
    }

    render() {
        return(
            <Icon.ToolbarAndroid
                navIconName="bars"
                iconColor="white"
                title={"Temp"}
                titleColor="white"
                style={styles.toolbar}
                onIconClicked={this.openDrawer}
            />
        );
    }
}