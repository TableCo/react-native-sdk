import React, {Component} from 'react'
import {View, Button, StyleSheet, Platform} from 'react-native'
import {TableSDK} from 'table-react-native-sdk'
import messaging from '@react-native-firebase/messaging'
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import JPush from 'jpush-react-native';
const GoogleAPIAvailability = require('react-native-google-api-availability-bridge');

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
            'https://YOUR_WORKSPACE.table.co/',
            'YOUR_SDK_API_KEY',
        )

        if (Platform.OS === 'ios') {
            await this.initIOS();
        } else {
            await this.initJPush();
            GoogleAPIAvailability.checkGooglePlayServices(async (result) => {
                console.log("Google API Availability: " + JSON.stringify(result))
                if (result !== 'missing' && result !== 'disabled') {
                    await this.initFCM();
                }
            });

        }

    }

    initJPush = async () => {
        JPush.init();

        this.notificationListener = pushNotification => {
            console.log("notificationListener:" + JSON.stringify(pushNotification));
            if (pushNotification.notificationEventType === "notificationOpened") {
                this.handleJPushNotification(pushNotification);
            }
        };
        JPush.addNotificationListener(this.notificationListener);

        JPush.getRegistrationID(registerId => {
            console.log("registerID:" + JSON.stringify(registerId));
            TableSDK.updateJPushRegistrationID(registerId.registerID);
        })
    }

    initFCM = async () => {
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

    initIOS = async () => {
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
    }

    onRegisterButtonPress = async () => {
        let tableParams = {
            email: 'app-user-@gmail.com',
            first_name: 'User',
            last_name: 'Name',
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

    handleJPushNotification = (pushNotification) => {
        if (TableSDK.isTablePushMessageJPush(pushNotification)) {
            this.props.navigation.navigate(
                'TableScreen',
                {
                    conversationId: pushNotification.extras['table_id']
                }
            )
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
