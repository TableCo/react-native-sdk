import React, {Component} from 'react'
import {Dashboard} from './Dashboard'
import {Video} from './Video'
import Navigator from 'react-native-easy-router'

export class TableScreen extends Component {

    constructor(props) {
        super(props);
    }

    // We're not using the React Navigation any more, but we'll probably be added to a navigation stack anyway so disable any headers
    static navigationOptions = ({navigation}) => {
        return {
            header: null
        };
    };

    render() {
        return (
            <Navigator screens={{ Dashboard, Video }}
                       initialStack={[{
                           screen: 'Dashboard',
                           props: {
                               onFinished: () => this.onDashboardFinished(),
                               key: 'Dashboard',
                               conversationId: this.props.navigation?.state?.params?.conversationId ?? ''
                           }}]
                       }/>
        )
    }

    onDashboardFinished() {
        // Let the developer know that we've finished or pop ourselves off the stack if we're on a navigator
        console.log("TableSDK - TableScreen onDashboardFinished()")

        if (this.props && this.props.onFinished) {
            this.props.onFinished()
        } else if (this.props.navigation) {
            this.props.navigation.goBack()
        }
    }

}

