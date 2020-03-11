# table-react-native-sdk
A React Native wrapper for [table.co](https://table.co/)

# Installation Guide

1. Install `table-react-native-sdk`:

    ```bash
    yarn add table-react-native-sdk  # or npm install table-react-native-sdk
    ```

1. Install `opentok-react-native`:

    ```bash
    yarn add opentok-react-native  # or npm install opentok-react-native
    ```

1. Import Intercom and initialise the SDK

    ```javascript
    import {TableSDK} from 'table-react-native-sdk';

    TableSDK.init(
      'https://YOUR_TABLE.table.co/',
      'YOUR_API_KEY',
      'YOUR_USER_HASH',
    )

    //...rest of your file...
    ```

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
TableSDK.registerWithDetail('user_id', tableParams)
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
