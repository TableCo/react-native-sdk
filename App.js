import React, {Component} from 'react';
import {Text, View} from 'react-native';
import * as TableSDK from './TableSDK';

export default class App extends Component {
  componentDidMount() {
    TableSDK.init.workspaceUrl = 'develop3.dev';
    TableSDK.init.apiKey = 'asasasas';
    TableSDK.init.userHash = 'asas';
    var tableParams = {
      email: 'felixthomas727@gmail.com',
      firstName: 'Felix',
      lastName: 'Thomas',
      custom_attributes: {},
    };

    TableSDK.register('asas', 'aas', tableParams)
      .then(response => {
        alert(JSON.stringify(response));
      })
      .catch(error => {
        alert(JSON.stringify(error));
      });
  }

  render() {
    return <View></View>;
  }
}
