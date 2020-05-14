import React, {Component} from 'react'
import {View, Button, StyleSheet} from 'react-native'
import {TableSDK} from 'table-react-native-sdk'
import messaging from '@react-native-firebase/messaging'

export default class Welcome extends Component {
    constructor(props) {
        super(props)
        this.navigation = props.navigation
    }

    static navigationOptions = () => {
        return {
            headerTitle: 'Table SDK Sample App',
        }
    }

    onMessageListener;
    onTokenRefreshListener;
    onAppOpenedFromBackground;

    async componentDidMount() {
        await TableSDK.init(
            'YOUR_WORKSPACE_URL',
            'YOUR_API_KEY',
        )

        const fcmToken = await messaging().getToken();
        await TableSDK.updateFCMToken(fcmToken);

        messaging().getInitialNotification().then(remoteMessage => {
            console.log("Get initial notification")
            if (TableSDK.isTablePushMessage(remoteMessage)) {
                this.props.navigation.navigate(
                    'TableScreen',
                    {
                        conversationId: remoteMessage.data['table_id']
                    }
                )
            }
        });

        this.onMessageListener = messaging().onMessage(async remoteMessage => {
            console.log("New message")
        });

        this.onTokenRefreshListener = messaging().onTokenRefresh(fcmToken => {
            TableSDK.updateFCMToken(fcmToken)
        })

        this.onAppOpenedFromBackground = messaging().onNotificationOpenedApp(remoteMessage => {
            console.log("Opened app")
            if (TableSDK.isTablePushMessage(remoteMessage)) {
                this.props.navigation.navigate(
                    'TableScreen',
                    {
                        conversationId: remoteMessage.data['table_id']
                    }
                )
            }
        })


    }

    onRegisterButtonPress = async () => {
        let tableParams = {
            email: 'app-user-@gmail.com',
            first_name: 'Your',
            last_name: 'User',
            user_hash: 'USER_HASH',
            custom_attributes: {},
        }

        try {
            await TableSDK.registerWithDetail('USER_ID', tableParams)
            alert('Successful registration')
            console.log('Successful registration')
        } catch (err) {
            alert(`Error ${err}`)
            console.log(err)
        }
    }

    onRegisterAnonymousButtonPress = async () => {
        try {
            await TableSDK.registerUnidentifiedUser()
            alert('Successful anonymous registration')
        } catch (err) {
            alert(`Error ${err}`)
            console.log(err)
        }
    }

    onConversationListPress = () => {
        this.props.navigation.navigate('TableScreen')
    }

    onTableScreenFinished = () => {
        console.log("Table SDK has finished")

        // Navigate back to us
        this.props.navigation.navigate('Welcome')
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.btnStyle}>
                    <Button onPress={this.onRegisterButtonPress} title="Register User" />
                </View>
                <View style={styles.btnStyle}>
                    <Button onPress={this.onRegisterAnonymousButtonPress} title="Anonymous User" />
                </View>
                <View style={styles.btnStyle}>
                    <Button
                        onPress={this.onConversationListPress}
                        title="Show Conversation List" />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    btnStyle: {
        width: '90%',
        alignSelf: 'center',
        margin: 5,
    },
})
