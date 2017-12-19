import React from 'react';
import { connect } from 'react-redux';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { List, ListItem } from 'react-native-elements'
import ActionButton from 'react-native-action-button';

const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
    },
});

class CategoryList extends React.Component {
    render() {
        return (
            <List>
            {
                this.props.categories[this.props.tabLabel].map(item =>
                    <ListItem
                        key={item.name}
                        title={item.name}
                    />
                )
            }
            </List>
        );
    }
}

class Categories extends React.Component {

    static navigationOptions = {
        drawerLabel: "Categories",
        hiddenView: true,
    }

    constructor() {
        super();
        this.state = {
            index: 0,
            routes: [
                { key: 'expense', title: 'Expense' },
                { key: 'income', title: 'Income' }
            ]
        };
    }

    _addCategory = () => {
        // nav to create category screen
    }

    _handleIndexChange = index => this.setState({ index })

    _renderHeader = (props) => {
        return (
            <TabBar
                {...props}
                useNativeDriver={true}
            />
        );
    }

    _renderScene = (props) => {
        return (
            <CategoryList
                {...this.props}
                tabLabel={props.route.key}
            />
        );
    }

    render() {
        return([
            <TabViewAnimated
                key="categories-tab-view"
                style={style.container}
                navigationState={this.state}
                renderScene={this._renderScene}
                renderHeader={this._renderHeader}
                onIndexChange={this._handleIndexChange}
                initialLayout={initialLayout}
                useNativeDriver
            />,
            <ActionButton
                key="create-category"
                position="right"
                offsetX={30}
                offsetY={30}
                buttonColor="rgba(231,76,60,1)"
                onPress={this._addCategory}
            />
        ])
    }
}

function mapStateToProps(state) {
    return { categories: state.categories }
}

export default connect(mapStateToProps)(Categories);