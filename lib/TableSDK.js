import AsyncStorage from '@react-native-community/async-storage';
import API from './API'

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
  const tableParams = {
    email: '',
    first_name: '',
    last_name: '',
    custom_attributes: {},
  };
  // const api = new API()
  return API.registerApiAsync(global.workspaceUrl, userID, tableParams);
};

export const registerWithDetail = async (userID, tableParams) => {
  // const api = new API()
  return await API.registerApiAsync(global.workspaceUrl, userID, tableParams)
};
