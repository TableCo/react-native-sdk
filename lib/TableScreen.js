import React, {Component} from 'react'
import {Text} from 'react-native'
import {Dashboard} from './Dashboard'
import {Video} from './Video'

// const MainStack = createStackNavigator(
//     {
//         Dashboard: Dashboard,
//         Video: Video /*,
//     TableScreen: TableScreen,*/
//     },
//     {
//         initialRouteName: 'Dashboard',
//         defaultNavigationOptions: {},
//     },
// );

export class TableScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentScreen: 'Dashboard'
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            header: null
        };
    };

    render() {
        const { currentScreen } = this.state

        if (currentScreen === 'Dashboard') {
            return(<Dashboard />)
        } else if (currentScreen === 'Video') {

        } else {
            console.log('TableSDK - Unsupported screen in TableScreen')
        }
        return (<Text>Unsupported screen</Text>)
    }

}

