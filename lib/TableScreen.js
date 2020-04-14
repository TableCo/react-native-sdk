import React, {Component} from 'react'
import {Dashboard} from './Dashboard'
import {Video} from './Video'
import {createStackNavigator} from 'react-navigation-stack'

const MainStack = createStackNavigator(
    {
        Dashboard: Dashboard,
        Video: Video /*,
    TableScreen: TableScreen,*/
    },
    {
        initialRouteName: 'Dashboard',
        defaultNavigationOptions: {},
    },
);

export class TableScreen extends Component {

    static router = MainStack.router

    constructor(props) {
        super(props);
    }

    static navigationOptions = ({navigation}) => {
        return {
            header: null
        };
    };

    render() {
        return (
            <MainStack navigation={this.props.navigation}/>
        )
    }

}

