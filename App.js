import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {View, Button, StyleSheet} from 'react-native';
import * as TableSDK from './src/TableSDK';
import Dashboard from './src/Dashboard';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    TableSDK.init('develop3.dev', 'asasasas', 'asas');
  }

  onButtonPress = () => {
    var tableParams = {
      email: 'felixthomas727@gmail.com',
      firstName: 'Felix',
      lastName: 'Thomas',
      custom_attributes: {},
    };
    TableSDK.register('asas', 'aas', tableParams)
      .then(() => {})
      .catch(() => {});
    AsyncStorage.getItem('data')
      .then(value => {
        alert(value);
      })
      .then(() => {});
  };

  onLogoutPress = () => {};

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.btnStyle}>
          <Button onPress={this.onButtonPress} title="call"></Button>
        </View>
        <Dashboard />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnStyle: {
    width: '90%',
    alignSelf: 'center',
    margin: 5,
  },
});
