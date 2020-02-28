import AsyncStorage from '@react-native-community/async-storage';

export const init = {workspaceUrl: '', apiKey: '', userHash: ''};

export const register = (userID, userHash, tableParams) => {
  return new Promise(function(resolve, reject) {
    var url =
      'https://' +
      init.workspaceUrl +
      '.table.co/user-service/user/auth/chat-user';
    init.workspaceUrl = url;
    fetch(init.workspaceUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user_id: userID,
        email: tableParams.email,
        api_key: init.apiKey,
        user_hash: init.userHash,
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
