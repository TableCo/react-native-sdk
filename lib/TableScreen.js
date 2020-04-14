import React, {Component} from 'react'
import {Dashboard} from './Dashboard'
import {Video} from './Video'
import {createStackNavigator} from 'react-navigation-stack'
import { useNavigation } from '@react-navigation/native';

const MainStack = createStackNavigator(
    {
        Dashboard: Dashboard,
        Video: Video
    },
    {
        initialRouteName: 'Dashboard',
        defaultNavigationOptions: {},
    },
);

export class TableScreen extends Component {
    // static router = MainStack.router

    constructor({ route, navigation }) {
        super();

        // console.log(`TableSDK - TableScreen constructed, navigator in props ${(this.props.navigator)}`)
        console.log(`TableSDK - TableScreen constructed, cons navigation & route ${route} ${JSON.stringify(navigation)}`)
    }

    static navigationOptions = ({navigation}) => {
        return {
            header: null
        };
    };

    render() {
        //TODO: Maybe get the screen to return to from the props here? Or during init?
        // const { navigator } = this.props

        return (
            <MainStack navigation={navigator}/>
        )
    }
}

