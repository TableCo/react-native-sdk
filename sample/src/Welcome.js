import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {View, Button, StyleSheet} from 'react-native';
import {Dashboard, TableSDK} from 'ta-table-sdk-react-native';

export default class Welcome extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'Sample App',
    };
  };

  componentDidMount() {
    TableSDK.init(
      'https://develop3.dev.table.co/',
      'qwerty',
      'ytrewq',
    ).then(resp => {});
  }

  onButtonPress = () => {
    var tableParams = {
      email: 'gareth+agent@foresightmobile.com',
      firstName: 'Gareth',
      lastName: 'Reese',
      custom_attributes: {},
    };
    TableSDK.register('sdsdsdsd', 'ytrewq', tableParams)
      .then(() => {
        alert('as');
      })
      .catch(() => {});
  };

  onConversationListPress = () => {
    TableSDK.showConversationList(this.props);
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.btnStyle}>
          <Button onPress={this.onButtonPress} title="Register"></Button>
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
