import AsyncStorage from '@react-native-community/async-storage';
import API from './API'

export const init = async (workspace, apiKey) => {
    global.workspaceUrl = validWorkspaceUrl(workspace);
    global.apiKey = apiKey;
    global.backgroundColor = await API.getInstallationProperties(global.workspaceUrl)
    console.log("New background col", global.backgroundColor)
};

const validWorkspaceUrl = (workspace) => {
    let validWorkspace = workspace;

    // Make sure we're on https protocol identifier
    if (!validWorkspace.includes('http')) {
        validWorkspace = 'https://' + validWorkspace
    }

    // If the developer used just their table ID then add the standard table domain
    if (!validWorkspace.includes('.')) {
        validWorkspace = validWorkspace + '.table.co'
    }

    // Don't want double trailing slashes
    if (validWorkspace.endsWith('//')) {
        validWorkspace = validWorkspace.substring(0, validWorkspace.length - 1)
    }

    // Make sure we always end with the trailing slash
    if (!validWorkspace.endsWith('/')) {
        validWorkspace = validWorkspace + '/'
    }

    return validWorkspace
}

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
