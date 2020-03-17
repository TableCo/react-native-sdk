import AsyncStorage from '@react-native-community/async-storage';

export const init = async (workspce, apiKey) => {
  var validWorkspace = workspce;
  if (!validWorkspace.includes('http')) {
    validWorkspace = 'https://' + validWorkspace;
  }
  if (!validWorkspace.includes('.')) {
    validWorkspace = validWorkspace + '.table.co';
  }

  global.workspaceUrl = validWorkspace;
  global.apiKey = apiKey;
  return 'Successful init';
};

export const showConversationList = props => {
  AsyncStorage.getItem('data').then(data => {
    if (data) {
      props.navigation.navigate('TableScreen');
    }
  });
};

// Not yet implemented
// As the presenter of the conversation list knows their route it is safer for the caller to pop or reset until at their 'presenting' route is the top
export const hideConversationList = props => {
  // const navigation = useNavigation();
};

export const logout = () => {
  return new Promise(function(resolve, reject) {
    AsyncStorage.removeItem('data').then(data => {
      resolve('Successfully logged out');
    });
  });
};

export const registerUnidentifiedUser = userID => {
  var tableParams = {
    email: '',
    first_name: '',
    last_name: '',
    custom_attributes: {},
  };
  return registerApiAsync(userID, tableParams);
};

export const registerWithDetail = async (userID, tableParams) => {
  return await registerApiAsync(userID, tableParams)
};

const registerBodyJson = (userID, tableParams) => {
  return JSON.stringify({
    user_id: userID,
    email: tableParams.email,
    api_key: global.apiKey,
    user_hash: tableParams.user_hash,
    first_name: tableParams.first_name,
    last_name: tableParams.last_name,
    custom_attributes: tableParams.custom_attributes,
  })
}

export const registerApiAsync = async (userID, tableParams) => {
  var url = global.workspaceUrl + 'user-service/user/auth/chat-user';
  console.log('registerApi() with params', tableParams)
  console.log('registerApi() with body', registerBodyJson(userID, tableParams))

  const response = await fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: registerBodyJson(userID, tableParams),
  })
  // const responseText = await response.clone().text()
  // console.log('Response text', responseText)
  const responseJson = await response.json()
  
  if (responseJson && responseJson.user) {
    responseJson.user.workspaceUrl = global.workspaceUrl;
    await AsyncStorage.setItem('data', JSON.stringify(responseJson))
    return 'Successfully registered user'
  } else {
    throw("No result on user registration")
  }
};