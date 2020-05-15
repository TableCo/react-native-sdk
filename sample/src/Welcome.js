import React, {Component} from 'react'
import {View, Button, StyleSheet, Platform} from 'react-native'
import {TableSDK} from 'table-react-native-sdk'
import messaging from '@react-native-firebase/messaging'
import PushNotificationIOS from '@react-native-community/push-notification-ios';

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
            'https://develop4.dev.table.co/',
            '978fQmN5ReV3vPKclQgHEg',
        )

        if (Platform.OS === 'ios') {
            PushNotificationIOS.addEventListener('register', (token) => {
                TableSDK.updateAPNSToken(token)
            });

            PushNotificationIOS.addEventListener('localNotification', (pushNotification) => {
                console.log("Notification: " + JSON.stringify(pushNotification));
                this.handleIOSNotification(pushNotification);
            });

            await PushNotificationIOS.requestPermissions();

            PushNotificationIOS.getInitialNotification().then(pushNotification => {
                this.handleIOSNotification(pushNotification);
            });
        } else {
            const fcmToken = await messaging().getToken();
            await TableSDK.updateFCMToken(fcmToken);

            messaging().getInitialNotification().then(remoteMessage => {
                this.handleFCMNotification(remoteMessage);
            });

            this.onMessageListener = messaging().onMessage(async remoteMessage => {
                console.log("New message")
            });

            this.onTokenRefreshListener = messaging().onTokenRefresh(fcmToken => {
                TableSDK.updateFCMToken(fcmToken)
            })

            this.onAppOpenedFromBackground = messaging().onNotificationOpenedApp(remoteMessage => {
                this.handleFCMNotification(remoteMessage);
            })
        }

    }

    handleFCMNotification = (remoteMessage) => {
        if (TableSDK.isTablePushMessageFCM(remoteMessage)) {
            this.props.navigation.navigate(
                'TableScreen',
                {
                    conversationId: remoteMessage.data['table_id']
                }
            )
        }
    }

    handleIOSNotification = (pushNotification) => {
        if (TableSDK.isTablePushMessageIOS(pushNotification)) {
            this.props.navigation.navigate(
                'TableScreen',
                {
                    conversationId: pushNotification._data['table_id']
                }
            )
        }
    }

    onRegisterButtonPress = async () => {
        let tableParams = {
            email: 'jackwalkerforesightmobile@gmail.com',
            first_name: 'Jack',
            last_name: 'iPhone',
            user_hash: '123',
            custom_attributes: {},
        }

        try {
            await TableSDK.registerWithDetail('2379', tableParams)
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
