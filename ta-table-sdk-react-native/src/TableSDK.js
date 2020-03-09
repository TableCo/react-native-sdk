import AsyncStorage from '@react-native-community/async-storage';

export const init = (workspce, apiKey, userHash) => {
  return new Promise(function(resolve, reject) {
    var validWorkspace = workspce;
    if (!validWorkspace.includes('http')) {
      validWorkspace = 'https://' + validWorkspace;
    }
    if (!validWorkspace.includes('.')) {
      validWorkspace = validWorkspace + '.table.co';
    }

    global.workspaceUrl = validWorkspace;
    global.apiKey = apiKey;
    global.userHash = userHash;
    resolve('success');
  });
};

export const showConversationList = props => {
  AsyncStorage.getItem('data').then(data => {
    if (data) {
      props.navigation.navigate('Dashboard');
    }
  });
};

export const logout = () => {
  return new Promise(function(resolve, reject) {
    AsyncStorage.removeItem('data').then(data => {
      resolve('success');
    });
  });
};

export const registerWithUser = userID => {
  var tableParams = {
    email: '',
    firstName: '',
    lastName: '',
    custom_attributes: {},
  };
  return registerApi(userID, tableParams);
};

export const registerWithDetail = (userID, tableParams) => {
  return registerApi(userID, tableParams);
};

export const registerApi = (userID, tableParams) => {
  return new Promise(function(resolve, reject) {
    var url = global.workspaceUrl + 'user-service/user/auth/chat-user';
    fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user_id: userID,
        email: tableParams.email,
        api_key: global.apiKey,
        user_hash: global.userHash,
        first_name: tableParams.first_name,
        last_name: tableParams.last_name,
        custom_attributes: tableParams.custom_attributes,
      }),
    })
      .then(response => response.json())
      .then(responseJSON => {
        var data = responseJSON;
        data.user.workspaceUrl = global.workspaceUrl;
        AsyncStorage.setItem('data', JSON.stringify(data)).then(data => {
          resolve('success');
        });
      })
      .catch(error => {
        reject(error);
      });
  });
};
