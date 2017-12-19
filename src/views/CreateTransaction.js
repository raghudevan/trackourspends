import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TransactionForm from '@components/TransactionForm';
import styles from '@assets/styles';
import * as ledgerActions from '@actions/ledger';

class CreateTransaction extends React.Component {

    static navigationOptions = {
        drawerLabel: "Add Transaction",
        hiddenView: true,
    }

    _onSubmit = (value) => {
        // call necessary action here
        this.props.actions.createTransaction(value);
        this.props.navigation.navigate('ledger');
    }

    _navToCategories = () => {
        this.props.navigation.navigate('categories');
    }

    render() {
        return (
            <View style={styles.fullHeightWidth}>
                <TransactionForm
                    onSubmit={this._onSubmit}
                    selectCategory={this._navToCategories}
                />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ledgerActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTransaction);