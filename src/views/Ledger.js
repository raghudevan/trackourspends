import React from 'react';
import { Dimensions, ScrollView, SectionList, StyleSheet, Text, View  } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { ListItem } from 'react-native-elements';
import ActionButton from 'react-native-action-button';

import {
    dateRange, currentDate,
    getDate, getMonthYear,
    sortDates
} from '@utils/date-time';

const style = StyleSheet.create({
    center: {
        flex: 1,
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        height: '100%',
    },
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
        flex: 1,
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

class EmptyList extends React.Component {
    render() {
        return (
            <View style={style.center}>
                <Text>Please add a transaction!</Text>
            </View>
        )
    }
}
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

class TransactionList extends React.Component {

    _renderItem = ({ item }) => {
        return (
            <ListItem
                containerStyle={style.listItem}
                hideChevron
                title={item.description}
                rightTitle={parseFloat(item.amount).toFixed(2)}
                rightTitleStyle={style.value}/>
        );
    }

    _renderHeader = ({ section }) => {
        let totalExpense = section.data.reduce((sum, current) => sum + parseFloat(current.amount), 0);
        return (
            <View style={style.header}>
                <Text style={style.headerText}>{getDate(section.title, 'D dddd')}</Text>
                <Text style={style.headerRightText}>{totalExpense.toFixed(2)}</Text>
            </View>
        );
    }

    _getSections = (data, monthYear) => {
        let monthData = data[getMonthYear(monthYear, 'MMM, YYYY')] || [];
        return monthData.sort((a, b) => a.title > b.title ? -1 : 1);
    }

    render() {
        return (
            <ScrollView
                contentContainerStyle={style.container}
            >
                {/* some meta data about the months's spends will go here */}
                <SectionList
                    style={{ width: "100%", padding: 10 }}
                    renderItem={this._renderItem}
                    renderSectionHeader={this._renderHeader}
                    sections={this._getSections(this.props.transactionalData, this.props.tabLabel)}
                    keyExtractor={(item, index) => item.timestamp}
                    SectionSeparatorComponent={SectionSeperator}
                    ListEmptyComponent={EmptyList}
                />
            </ScrollView>
        );
    }
}

const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
};

class Ledger extends React.Component {

    static navigationOptions = {
        drawerLabel: "Ledger"
    }

    constructor(props) {
        super(props);
        let { index, range } = this._makeTabs(props.transactionalData);
        this.state = {
            index,
            routes: range.map(date => ({ key: date, title: date })),
        };
    }

    _addTransaction = () => {
        // navigate to the transaction screen
        this.props.navigation.navigate('create-transaction');
    }

    _makeTabs = (transactionalData) => {
        // can call this when user scrolls - just load the frame that is necessary
        let indexAndRange = {};
        let sortedMonths = sortDates(Object.keys(transactionalData), 'MMM, YYYY');

        // always show current month
        let current = currentDate('MMM, YYYY');
        if (sortedMonths.length > 0) {
            // first month - 48mnths, last month + 48mnths
            indexAndRange = dateRange(sortedMonths[0], sortedMonths[sortedMonths.length - 1],
                sortedMonths[sortedMonths.length - 1], [5, 'months'], 'MMM, YYYY');
        } else {
            // center around current month
            indexAndRange = dateRange(current, current,
                current, [5, 'months'], 'MMM, YYYY');
        }
        // need to display this in the tab bar
        // show +10/-10 months?
        // show This month, next month, previous month?
        return indexAndRange;
    }

    _handleIndexChange = index => this.setState({ index });

    _renderHeader = (props) => {
        return (
            <TabBar
                {...props}
                useNativeDriver={true}
                scrollEnabled
                style={{ backgroundColor: '#1E88E5', height: 20 }}
                tabStyle={{ height: 20 }}
                labelStyle={{ height: 20 }}
            />
        );
    }

    _renderScene = (props) => {
        return (
            <TransactionList
                {...this.props}
                tabLabel={props.route.title}
            />
        );
    }

    render() {
        return([
            <TabViewAnimated
                key="ledger-tab-view"
                style={style.container}
                navigationState={this.state}
                renderScene={this._renderScene}
                renderHeader={this._renderHeader}
                onIndexChange={this._handleIndexChange}
                initialLayout={initialLayout}
                useNativeDriver
                lazy
            />,
            <ActionButton
                key="create-transaction"
                position="right"
                offsetX={30}
                offsetY={30}
                buttonColor="rgba(231,76,60,1)"
                onPress={this._addTransaction}
            />
        ]);
    }
}

function mapStateToProps(state) {
    return { transactionalData: { ...state.ledger } };
}

export default connect(mapStateToProps)(Ledger)