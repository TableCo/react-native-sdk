import React, {Component} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {TableSDK} from 'table-react-native-sdk';

export default class Welcome extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = () => {
    return {
      headerTitle: 'Table SDK Sample App',
    };
  };

  componentDidMount() {
    TableSDK.init(
      'https://develop3.dev.table.co/',
      'YOUR_SDK_API_KEY',
    ).then(() => {});
  }

  onRegisterButtonPress = async () => {
    var tableParams = {
      email: 'app-user@gmail.com',
      first_name: 'Your',
      last_name: 'User',
      user_hash: 'USER_HASH',
      custom_attributes: {},
    };

    try {
      await TableSDK.registerWithDetail('USER_ID', tableParams)
      alert('Successful registration');
      console.log('Successful registration')
    } catch (err) {
      alert(`Error ${err}`);
      console.log(err)
    }
  };

  onRegisterAnonymousButtonPress = async () => {
    await TableSDK.registerUnidentifiedUser()
      .then(() => {
        alert('Successful anonymous registration');
      })
      .catch((e) => {
        console.log(e)
        alert(`Error - ${e}`);
      });
  };

  onRegisterAnonymousPlusIdButtonPress = async () => {
    try {
      await TableSDK.registerWithDetail('USER_ID')
      alert('Successful registration');
      console.log('Successful registration')
    } catch (err) {
      alert(`Error ${err}`);
      console.log(err)
    }
  };

  onConversationListPress = () => {
    TableSDK.showConversationList(this.props);
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.btnStyle}>
          <Button onPress={this.onRegisterButtonPress} title="Register User"></Button>
        </View>
        <View style={styles.btnStyle}>
          <Button onPress={this.onRegisterAnonymousButtonPress} title="Anonymous User"></Button>
        </View>
        <View style={styles.btnStyle}>
          <Button onPress={this.onRegisterAnonymousPlusIdButtonPress} title="Anonymous Plus ID"></Button>
        </View>
        <View style={styles.btnStyle}>
          <Button
            onPress={this.onConversationListPress}
            title="Show Conversation List"></Button>
        </View>
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
