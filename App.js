import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';
import * as TableSDK from './src/TableSDK';

export default class App extends Component {
  componentDidMount() {
    TableSDK.init('develop3.dev', 'asasasas', 'asas');
  }
  onButtonPres = () => {
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
      .catch(error => {});
  };

  render() {
    return (
      <View>
        <Button onPress={this.onButtonPres} title="call "></Button>
      </View>
    );
  }
}
