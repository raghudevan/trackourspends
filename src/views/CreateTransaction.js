import React from 'react';
import { View, Text } from 'react-native';

import styles from '@assets/styles';

export default class CreateTransaction extends React.Component {

    static navigationOptions = {
        drawerLabel: "Add New Transaction",
        hiddenView: true,
    }

    render() {
        return (
            <View style={styles.center}>
                <Text>
                    create transaction view
                </Text>
            </View>
        );
    }
}