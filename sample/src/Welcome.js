import React, {Component} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {TableSDK} from 'ta-table-sdk-react-native';

export default class Welcome extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = () => {
    return {
      headerTitle: 'Sample App',
    };
  };

  componentDidMount() {
    TableSDK.init(
      'https://develop3.dev.table.co/',
      'api_Key',
      'user_hash',
    ).then(() => {});
  }

  onRegisterButtonPress = () => {
    var tableParams = {
      email: 'felixthomas@gmail.com',
      firstName: 'felix',
      lastName: 'thomas',
      custom_attributes: {},
    };
    TableSDK.registerWithDetail('user_id', tableParams)
      .then(() => {
        alert('Successful registration');
        console.log('Successful registration')
      })
      .catch((e) => {
        console.log(e)
        alert(`Error ${e}`);
      });
  };

  onRegisterAnonymousButtonPress = () => {
    TableSDK.registerUnidentifiedUser()
      .then(() => {
        alert('Successful anonymous registration');
      })
      .catch((e) => {
        console.log(e)
        alert(`Error ${e}`);
      });
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
