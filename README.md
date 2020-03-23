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

    Your SDK API KEY can be found in the Organization Settings section of your Workspace.

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

### Show the Table conversation list to the user using the navigator
```javascript
TableSDK.showConversationList();
```
