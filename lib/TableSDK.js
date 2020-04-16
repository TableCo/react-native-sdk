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
