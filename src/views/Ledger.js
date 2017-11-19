import React from 'react';
import { SectionList, StyleSheet, Text, View  } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ListItem } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import styles from '@assets/styles';

const style = StyleSheet.create({
    header: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'grey',
        borderBottomWidth: 0.25,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderTopWidth: 0.25,
        elevation: 5,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        width: "100%",
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    headerRightText: {
        paddingRight: 15,
    },
    listItem: {
        backgroundColor: 'white',
        borderColor: 'grey',
        borderBottomWidth: 0.20,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        elevation: 5,
    },
    finalSeperator: {
        borderColor: 'grey',
        borderTopWidth: 0.14,
        height: 120,
        width: "100%",
    },
    seperator: {
        borderColor: 'grey',
        borderTopWidth: 0.14,
        height: 40,
        width: "100%",
    },
    noseperator: {
        height: 0,
    },
    value: {
        color: 'black',
        fontWeight: 'bold',
    }
});

class SectionSeperator extends React.Component {
    _getStyle = ({ trailingItem, trailingSection }) => {
        // leading section and current section don't match => space needed
        if (!trailingItem && !trailingSection) {
            return style.finalSeperator;
        } else if (!trailingItem) {
            return style.seperator;
        } else {
            return style.noseperator;
        }
    }

    render() {
        return (
            <View style={this._getStyle(this.props)}></View>
        );
    }
}

class Ledger extends React.Component {

    static navigationOptions = {
        drawerLabel: "Ledger"
    }

    _addTransaction = () => {
        // navigate to the transaction screen
        this.props.navigation.navigate('create-transaction');
    }

    _renderItem = ({ item }) => {
        return (
            <ListItem
                containerStyle={style.listItem}
                hideChevron
                title={item.description}
                rightTitle={parseFloat(item.value).toFixed(2)}
                rightTitleStyle={style.value}/>
        );
    }

    _renderHeader = ({ section }) => {
        let totalExpense = section.data.reduce((sum, current) => sum + parseFloat(current.value), 0);
        return (
            <View style={style.header}>
                <Text style={style.headerText}>{section.title}</Text>
                <Text style={style.headerRightText}>{totalExpense.toFixed(2)}</Text>
            </View>
        );
    }

    render() {
        return(
            <View style={styles.center}>
                <SectionList
                    style={{ width: "100%", padding: 20 }}
                    renderItem={this._renderItem}
                    renderSectionHeader={this._renderHeader}
                    sections={this.props.transactions}
                    keyExtractor={(item, index) => item.timestamp}
                    SectionSeparatorComponent={SectionSeperator}
                />

                <ActionButton
                    position="right"
                    offsetX={30}
                    offsetY={30}
                    buttonColor="rgba(231,76,60,1)"
                    onPress={this._addTransaction}
                />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return { ...state.ledger };
}

//function mapDispatchToProps(dispatch) {
//    return {
//        actions: bindActionCreators(ledgerActions, dispatch)
//    };
//}

export default connect(mapStateToProps)(Ledger)