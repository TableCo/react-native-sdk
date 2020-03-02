import AsyncStorage from '@react-native-community/async-storage';
export const init = (workspce, apiKey, userHash) => {
  global.workspaceUrl = 'https://' + workspce + '.table.co/';
  global.apiKey = apiKey;
  global.userHash = userHash;
};
export const showConversationList = () => {
  AsyncStorage.getItem('data').then(data => {
    if (data) {
    }
  });
};
export const logout = () => {
  AsyncStorage.removeItem('data').then(data => {});
};
export const register = (userID, userHash, tableParams) => {
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
        AsyncStorage.setItem('data', JSON.stringify(responseJSON)).then(
          data => {
            resolve('success');
          },
        );
      })
      .catch(error => {
        reject(error);
      });
  });
};
