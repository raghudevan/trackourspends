import React from 'react';
import PropTypes from 'prop-types';
import { DatePickerAndroid, Keyboard, ScrollView, StyleSheet } from 'react-native';
import { Button, FormLabel, FormInput, Icon } from 'react-native-elements'
import ActionButton from 'react-native-action-button';
import moment from 'moment';
import _ from 'lodash';

import { Alert } from '@alert';
import { getDate } from '@utils/date-time';

const mergeStyles = (...keys) => StyleSheet.flatten(keys.map(key => style[key]));

const BUTTON_COLOR = '#7e7e7e';
const UNDERLINE_COLOR = '#64B5F6';
const style = StyleSheet.create({
    container: {
        backgroundColor: '#FAFAFA',
        paddingTop: 20,
    },
    fullHeight: {
        flex: 1,
    },
    base: {
        width: '100%',
    },
    label: {
        marginTop: 20,
        paddingLeft: 0,
    },
    inputField: {}
});

class TransactionForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            containerStyle: mergeStyles('container', 'fullHeight'),
            amount: _.get(props, 'amount', ''),
            category: _.get(props, 'category', ''),
            date: moment().valueOf(),
            description: _.get(props, 'category', ''),
        }
    }

    componentDidMount() {
        this.showKeyboardListener = Keyboard.addListener('keyboardDidShow', this._onKeyboardOpen);
        this.hideKeyboardListener = Keyboard.addListener('keyboardDidHide', this._onKeyboardClose);
    }

    componentWillUnmount() {
        this.hideKeyboardListener.remove();
    }

    _onKeyboardClose = () => {
        this._validateAmt();
        this._setViewHeightToFull(true);
    }

    _onKeyboardOpen = () => {
        this._setViewHeightToFull(false);
    }

    _setViewHeightToFull = (isFull = false) => {
        this.setState({
            containerStyle: isFull ? mergeStyles('container', 'fullHeight') : mergeStyles('container')
        });
    }

    _datePicker = async () => {
        const { action, year, month, day } = await DatePickerAndroid.open({
            date: new Date(),
        });
        if (action !== DatePickerAndroid.dismissedAction) {
            //const diff = moment(new Date()).diff(moment(new Date(year, month, day)), 'days');
            this.setState({
                date: moment(new Date(year, month, day)).valueOf()
            });
        }
    }

    _selectCategory = () => {
        // nav to category view
        this.props.selectCategory();
    }

    _handleChange = (type, value) => {
        // handle changes to state
        this.setState({
            [type]: value,
        });
    }

    _validateAmt = () => {
        const amt = parseFloat(this.state.amount);
        this.setState({
            amount: isNaN(amt) ? '0.00' : amt.toFixed(2)
        });
    }

    _addTransaction = () => {
        // invoke the submit functionality
        const amt = parseFloat(this.state.amount);
        if (isNaN(amt) || amt <= 0) {
            Alert.warn('Expected amount to be greater than zero!');
        } else {
            let { containerStyle, ...transactionDetails } = this.state;
            this.props.onSubmit({ ...transactionDetails, timestamp: moment().unix() });
        }
    }

    _onFocusInput = () => {
        Alert.hide();
    }

    render() {
        return (
            <ScrollView
                contentContainerStyle={this.state.containerStyle}
            >

                {/* Transaction Amount */}
                <FormLabel
                    containerStyle={mergeStyles('base')}
                    labelStyle={mergeStyles('label')}>
                    Amount
                </FormLabel>

                <FormInput
                    caretHidden
                    containerStyle={mergeStyles('base', 'inputField')}
                    onChangeText={this._handleChange.bind(null, 'amount')}
                    onFocus={this._onFocusInput}
                    placeholder='0.00'
                    keyboardType='numeric'
                    underlineColorAndroid={UNDERLINE_COLOR}
                    value={this.state.amount}
                />

                {/* Transaction Date */}
                <FormLabel
                    containerStyle={mergeStyles('base')}
                    labelStyle={mergeStyles('label')}>
                    Date
                </FormLabel>

                <Button
                    buttonStyle={{ backgroundColor: '#FAFAFA' }}
                    color={BUTTON_COLOR}
                    leftIcon={{ name: 'md-calendar', size: 25, type: 'ionicon', color: BUTTON_COLOR }}
                    title={getDate(this.state.date)}
                    onPress={this._datePicker}
                />

                {/* Transaction Category */}
                <FormLabel
                    containerStyle={mergeStyles('base')}
                    labelStyle={mergeStyles('label')}>
                    Category
                </FormLabel>

                {/*
                  * conditionally render either a button to navCategories to the category view
                  * or render the category form item
                  */}
                <Button
                    buttonStyle={{ backgroundColor: '#FAFAFA' }}
                    color={BUTTON_COLOR}
                    leftIcon={{ name: 'md-pricetag', size: 25, type: 'ionicon', color: BUTTON_COLOR }}
                    title='Choose a category'
                    onPress={this._selectCategory}
                />

                {/* Transaction Wallet */}
                <FormLabel
                    containerStyle={mergeStyles('base')}
                    labelStyle={mergeStyles('label')}>
                    Wallet
                </FormLabel>

                {/*
                  * conditionally render either a button to nav to the wallet view
                  * or render the wallet form item
                  */}
                <Button
                    buttonStyle={{ backgroundColor: '#FAFAFA' }}
                    color={BUTTON_COLOR}
                    leftIcon={{ name: 'wallet', size: 25, type: 'material-community', color: BUTTON_COLOR }}
                    title='Choose a wallet'
                    onPress={this._selectCategory}
                />

                {/* Transaction Description */}
                <FormLabel
                    containerStyle={mergeStyles('base')}
                    labelStyle={mergeStyles('label')}>
                    Description
                </FormLabel>

                <FormInput
                    containerStyle={mergeStyles('base', 'inputField')}
                    multiLine={true}
                    onChangeText={this._handleChange.bind(null, 'description')}
                    placeholder='Transaction details'
                    underlineColorAndroid={UNDERLINE_COLOR}
                    value={this.state.description}
                />

                {/* Submit Transaction */}
                <ActionButton
                    icon={<Icon type='fontawesome' name='check' color='#fff'/>}
                    position='right'
                    offsetX={30}
                    offsetY={30}
                    buttonColor='#3cba54'
                    onPress={this._addTransaction}
                />
            </ScrollView>
        );
    }
}

TransactionForm.propTypes = {
    amount: PropTypes.number,
    category: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    onSubmit: PropTypes.func,
    wallet: PropTypes.string,
}

export default TransactionForm;