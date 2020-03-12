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
      'https://WORKSPACE.table.co/',
      'API_KEY',
    ).then(() => {});
  }

  onRegisterButtonPress = async () => {
    var tableParams = {
      email: 'johndoe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      userHash: 'USER_HASH',
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


      // .then(() => {
      //   alert('Successful registration');
      //   console.log('Successful registration')
      // })
      // .catch((e) => {
      //   console.log(e)
      //   alert(`Error ${e}`);
      // });
  };

  onRegisterAnonymousButtonPress = () => {
    TableSDK.registerUnidentifiedUser("user_id-32233")
      .then(() => {
        alert('Successful anonymous registration');
      })
      .catch((e) => {
        console.log(e)
        alert(`Error - ${e}`);
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
