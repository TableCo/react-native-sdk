import AsyncStorage from '@react-native-community/async-storage';
import API from './API'

export const init = async (workspace, apiKey) => {
    let validWorkspace = workspace;
    if (!validWorkspace.includes('http')) {
        validWorkspace = 'https://' + validWorkspace;
    }
    if (!validWorkspace.includes('.')) {
        validWorkspace = validWorkspace + '.table.co';
    }

    global.workspaceUrl = validWorkspace;
    global.apiKey = apiKey;
    global.backgroundColor = await API.getInstallationProperties(global.workspaceUrl)
    console.log("New background col", global.backgroundColor)
};

export const showConversationList = props => {
    AsyncStorage.getItem('data').then(data => {
        if (data) {
            props.navigation.navigate('TableScreen')
        }
    });
};

// Not yet implemented
// As the presenter of the conversation list knows their route it is safer for the caller to pop or reset until at their 'presenting' route is the top
export const hideConversationList = props => {
    // const navigation = useNavigation();
};

export const logout = () => {
    return new Promise(function (resolve, reject) {
        AsyncStorage.removeItem('data').then(data => {
            resolve('Successfully logged out');
        });
    });
};

export const registerUnidentifiedUser = () => {
    const tableParams = {
        email: '',
        first_name: '',
        last_name: '',
        custom_attributes: {},
    }

    return API.registerApi(global.workspaceUrl, null, tableParams);
};

export const registerWithDetail = async (userID, tableParams = null) => {
    if (tableParams === null) {
        tableParams = {
            email: '',
            first_name: '',
            last_name: '',
            custom_attributes: {},
        };
    }
    return await API.registerApi(global.workspaceUrl, userID, tableParams)
};
