import React from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import * as NOTIFICATION from '@constants/notification';

export class Alert {
    static init(notifier) {
        Alert.success = (message) =>
            notifier.show({ message, type: NOTIFICATION.SUCCESS });
        Alert.warn = (message) =>
            notifier.show({ message, type: NOTIFICATION.WARN, hideAfter: Infinity });
        Alert.error = (message) =>
            notifier.show({ message, type: NOTIFICATION.ERROR, hideAfter: Infinity });
        Alert.show = notifier.show;
        Alert.hide = notifier.hide;
        Alert.isVisible = notifier.isVisible;
    }
}

export default class Notifier extends React.Component {
    constructor() {
        super();
        this.state = {
            isVisible: false,
            offsetY: new Animated.Value(-60),
            opacity: new Animated.Value(0),
            notificationColor: '#66BB6A',
            textColor: '#F5F5F5',
        };
    }

    isVisible = () => {
        return this.state.isVisible;
    }

    show = ({
        message = 'Hello world',
        hideAfter = 350,
        type = NOTIFICATION.SUCCESS,
        onDismiss = () => { this.hide(); },
    } = {}) => {
        const typeColorMap = {
            [NOTIFICATION.SUCCESS]: '#66BB6A',
            [NOTIFICATION.WARN]: '#EF6C00',
            [NOTIFICATION.ERROR]: '#DD2C00',
        };

        this.setState({
            isVisible: true,
            message,
            notificationColor: typeColorMap[type] || '#EF6C00',
            onDismiss,
            type,
        }, () => this._animateShow({ delay: hideAfter }));

    }

    _animateShow = ({ delay = 1500 } = {}) => {
        Animated.parallel([
            Animated.spring(
                this.state.offsetY,
                {
                    toValue: 0,
                    duration: 1000,
                    friction: 20,
                    useNativeDriver: true,
                }
            ),
            Animated.timing(
                this.state.opacity,
                {
                    toValue: 1,
                    duration: 250,
                    useNativeDriver: true,
                },
            )
        ]).start(({ finished }) => {
            // control this with a prop
            if (delay < Infinity) {
                this.hide({ delay });
            }
        });
    }

    hide = ({ delay = 0 } = {}) => {
        Animated.sequence([
            Animated.delay(delay),
            Animated.parallel([
                Animated.spring(
                    this.state.offsetY,
                    {
                        toValue: -60,
                        duration: 1000,
                        useNativeDriver: true,
                    }
                ),
                Animated.timing(
                    this.state.opacity,
                    {
                        toValue: 0,
                        duration: 1000,
                        useNativeDriver: true,
                    },
                )
            ])
        ])
        .start(() => this.setState({ isVisible: false }));
    }

    _getIconName = (type) => {
        const typeIconNameMap = {
            [NOTIFICATION.SUCCESS]: 'check',
            [NOTIFICATION.WARN]: 'info',
            [NOTIFICATION.ERROR]: 'chain-broken',
        };

        return typeIconNameMap[type] || 'info';
    }

    render() {
        return (
            <Animated.View
                style={{
                    backgroundColor: this.state.notificationColor,
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: 60,
                    opacity: this.state.opacity,
                    position: 'absolute',
                    transform: [{ translateY: this.state.offsetY }],
                    width: '100%',
                }}
            >
                <Icon
                    containerStyle={{ padding: 20, left: 0 }}
                    iconStyle={{ color: this.state.textColor, fontSize: 28 }}
                    name={this._getIconName(this.state.type)}
                    type='font-awesome'
                />
                <Text
                    style={{
                        backgroundColor: this.state.notificationColor,
                        color: this.state.textColor,
                        fontWeight: 'bold',
                        paddingTop: 20,
                        paddingBottom: 20,
                    }}
                >
                    {this.state.message}
                </Text>

                <Icon
                    containerStyle={{ padding: 20, opacity: this.state.type === NOTIFICATION.SUCCESS ? 0 : 1 }}
                    iconStyle={{ color: '#616161', fontSize: 22, fontWeight: 'bold' }}
                    name='close'
                    type='simple-line-icon'
                    onPress={this.state.onDismiss}
                    underlayColor={this.state.notificationColor}
                />
            </Animated.View>
        );
    }
}