# table-react-native-sdk
A React Native SDK for [TABLE.co](https://table.co)

# Installation Guide

1. Install `table-react-native-sdk`:

    ```bash
    yarn add table-react-native-sdk  # or npm install table-react-native-sdk
    ```

1. Import and initialise the SDK

    ```javascript
    import { TableSDK } from 'table-react-native-sdk';

    TableSDK.init(
      'https://YOUR_WORKSPACE.table.co/',
      'YOUR_SDK_API_KEY'
    )

    //...rest of your file...
    ```

1. Add the TableScreen Component to your route configuration

    ```javascript
    import {TableScreen} from 'table-react-native-sdk'
    
    const AuthStack = createStackNavigator(
        {
            Welcome: MyHomeScreen,
            TableScreen: TableScreen
        },
    
        {
            initialRouteName: 'MyHomeScreen',
            defaultNavigationOptions: {},
        },
    )
    ```

    Your SDK API key can be found in the Organization Settings section of your Workspace.

    You'll need to call either `TableSDK.registerUnidentifiedUser()` or `TableSDK.registerWithDetail()` before calling methods that require user information such as `TableSDK.showConversationList()`.

# Usage

### Register a Logged In user
```javascript
var tableParams = {
    email: 'app-user@gmail.com',
    first_name: 'Your',
    last_name: 'User',
    custom_attributes: {},
};
TableSDK.registerWithDetail('USER_ID', tableParams)
```

### Register an Unidentified user anonymously
```javascript
TableSDK.registerUnidentifiedUser();
```

### Sign Out
```javascript
TableSDK.logout()
```

### Show the Table conversation list to the user 
```javascript
onShowTable = () => {
    this.props.navigation.navigate('TableScreen')
}
```

# Push Notifications

## Firebase Cloud Messaging
We have peer dependencies in this SDK for ```@react-native-firebase/app``` and ```@react-native-firebase/messaging```

To implement FCM, you will need to add both these dependencies with ```yarn add @react-native-firebase/app && yarn add @react-native-firebase/messaging``` and handle Firebase Cloud Messages via these dependencies.

Documentation for these plugins can be found [here](https://rnfirebase.io/messaging/usage)

###FCM Token
To receive Firebase Cloud Messages from Table conversations, you will need to pass the FCM token to this function:
```javascript
TableSDK.updateFcmToken(fcmToken, androidNotificationChannel)
```
The ```androidNotificationChannel``` argument in this function is optional.

###Checking for Table message
To check that the message you are getting from Firebase is a Table message, you can use the function: 
```javascript
TableSDK.isTablePushMessageFCM(remoteMessage)
```
If this returns true, the message will have a ```table_id``` parameter in the ```data``` of the remote message. ```table_id``` is the conversation ID that the message came from.

###Checking for Google Play Services
In some countries, phones will not have Google Play Services, so will not be able to use FCM. To check for Google Play Services you can use this plugin: [```react-native-google-api-availability-bridge```](https://github.com/UCSD/react-native-google-api-availability-bridge)

## IOS Push Notifications
We have a peer dependency in this SDK for ```@react-native-community/push-notification-ios```

To implement iOS Push Notifications with this SDK, you will need to add the aforementioned plugin using ```yarn add @react-native-community/push-notification-ios```

Documentation for this plugin can be found [here](https://github.com/react-native-community/push-notification-ios).

### APNS Token
To start receiving iOS Push Notifications from your Table conversations, you will need to pass the APNS Token the above package gives you to this function:
```javascript
TableSDK.updateAPNSToken(apnsToken)
```

### Checking for Table Message
To check that the push notification you are getting is a Table message, you can use the function: 
```javascript
TableSDK.isTablePushMessageIOS(pushNotification)
```
If this returns true, the push notification will have a ```table_id``` parameter in the ```_data``` of the push notification. ```table_id``` is the conversation ID that the message came from.

# JPush
This Table SDK also supports JPush notifications. We have peer dependencies for ```jpush-react-native``` and ```jcore-react-native```

The setup and installation guide for JPush notifications can be found [here](https://github.com/jpush/jpush-react-native)

### JPush Registration ID
To receive JPush Notifications from your Table conversations, you will need to pass the JPush Registraction ID to this function:
```javascript
TableSDK.updateJPushRegistrationID(registrationId)
```

### Checking for Table Message
To check that the push notification you are getting is a Table message, you can use the function: 
```javascript
TableSDK.isTablePushMessageJPush(pushNotification)
```
If this returns true, the push notification will have a ```table_id``` parameter in the ```extras``` of the push notification. ```table_id``` is the conversation ID that the message came from.
