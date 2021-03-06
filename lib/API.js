import AsyncStorage from '@react-native-community/async-storage';

export default class API {
  static registerBodyJson = (userID, tableParams) => {
    return JSON.stringify({
      user_id: userID,
      email: tableParams.email,
      api_key: global.apiKey,
      user_hash: tableParams.user_hash,
      first_name: tableParams.first_name,
      last_name: tableParams.last_name,
      custom_attributes: tableParams.custom_attributes,
    });
  };

  static registerApi = async (workspaceUrl, userID, tableParams) => {
    var url = workspaceUrl + 'user-service/user/auth/sdk-chat-user';
    // console.log('registerApi() with params', tableParams)
    // console.log('registerApi() with body', this.registerBodyJson(userID, tableParams))

    const response = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: this.registerBodyJson(userID, tableParams),
    });
    // const responseText = await response.clone().text()
    // console.log(' Response text', responseText)

    const responseJson = await response.json();

    if (responseJson && responseJson.user) {
      responseJson.user.workspaceUrl = global.workspaceUrl;
      await AsyncStorage.setItem('data', JSON.stringify(responseJson));
      // console.log("Registered", responseJson)
      return 'Successfully registered user';
    } else {
      throw 'No result on user registration';
    }
  };

  static getConversationTitleFromApi = async (workspaceUrl, tableId, token) => {
    const url = workspaceUrl + 'table-service/table/' + tableId;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    const json = await response.json();
    return json['title'];
  };

  static getApiKey = async (workspaceUrl) => {
    const response = await fetch(
      workspaceUrl + 'installation-service/installation/opentok-api-key',
      {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      },
    );

    const json = await response.json();
    return json['opentok_api_key'].toString();
  };

  static createConversation = async (
    workspaceUrl,
    token,
    experienceShortCode,
  ) => {
    const url = workspaceUrl + 'table-service/table';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        experience_short_code: experienceShortCode,
      }),
    });

    const json = await response.json();
    return json['id'];
  };

  static getInstallationProperties = async (workspaceUrl) => {
    const url = workspaceUrl + 'installation-service/installation/properties';

    const response = await fetch(url, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    });

    const responseText = await response.clone().text();
    console.log('IP text', responseText);

    const json = await response.json();
    if (
      json['theme_overrides'] &&
      json['theme_overrides']['semanticPalette'] &&
      json['theme_overrides']['semanticPalette']['primary']
    ) {
      return json['theme_overrides']['semanticPalette']['primary'];
    } else {
      return '#307AEB';
    }
  };

  static updateFcmToken = async (
    workspaceUrl,
    fcmToken,
    authToken,
    androidNotificationChannel,
  ) => {
    const url = workspaceUrl + 'user-service/user/add_contact_fcm_device_token';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
      body: JSON.stringify({
        contact_fcm_device_token: fcmToken,
        contact_fcm_notfication_channel: androidNotificationChannel,
        contact_fcm_notification_channel: androidNotificationChannel,
      }),
    });

    if (response.status === 200) {
      console.log('FCM token updated successfully');
    } else {
      console.log('Could not update FCM token');
    }
  };

  static updateAPNSToken = async (workspaceUrl, apnsToken, authToken) => {
    const url =
      workspaceUrl + 'user-service/user/add_contact_apns_device_token';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
      body: JSON.stringify({
        contact_apns_device_token: apnsToken,
      }),
    });

    if (response.status === 200) {
      console.log('APNS token updated successfully');
    } else {
      console.log('Could not update APNS token');
    }
  };

  static updateJPushRegistrationID = async (
    workspaceUrl,
    registrationId,
    authToken,
    androidNotificationChannel,
  ) => {
    const url =
      workspaceUrl + 'user-service/user/add_contact_jpush_device_token';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
      body: JSON.stringify({
        contact_jpush_device_token: registrationId,
        contact_jpush_notification_channel: androidNotificationChannel,
      }),
    });

    if (response.status === 200) {
      console.log('JPush Registration ID updated successfully');
    } else {
      console.log('Could not update JPush Registration ID');
    }
  };
  static getTable = async (workspaceUrl, token, experienceShortCode) => {
    const url = workspaceUrl + 'table-service/table-for-experience';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        experience_short_code: experienceShortCode,
      }),
    });

    const json = await response.json();
    return json['id'];
  };
}
