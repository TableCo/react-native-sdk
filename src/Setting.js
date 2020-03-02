import React, {Component} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onLogoutPress() {
    AsyncStorage.removeItem('data');
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ItemText title={'Name'} itemName={'John'} />

        <ItemText
          title={'Workspace'}
          itemName={'develop3.dev'}
          endPointUrl={'.table.co'}
        />

        <ItemText title={'App Version'} itemName={'1.0.0'} />
        <TouchableOpacity
          style={{
            width: '90%',
            position: 'absolute',
            bottom: 20,
            backgroundColor: 'rgba(239, 94, 117, 0.1)',
            alignItems: 'center',
            alignSelf: 'center',
            borderRadius: 8,
          }}
          onPress={() => this.onLogoutPress()}>
          <Text
            style={{
              color: '#EF5E75',
              fontSize: 16,
              padding: 10,
              fontWeight: 'bold',
            }}>
            {'Logout'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const ItemText = props => {
  return (
    <View
      style={{margin: 10, borderBottomWidth: 1, borderBottomColor: '#E6EDF0'}}>
      <Text style={{fontSize: 12, color: '#6F7C82', paddingBottom: 10}}>
        {props.title}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 16,
            color: '#202425',
            paddingBottom: 10,
          }}>
          {props.itemName}
        </Text>
        {props.endPointUrl ? (
          <Text
            style={{
              fontSize: 16,
              color: '#9AA6AC',
              paddingBottom: 10,
            }}>
            {props.endPointUrl}
          </Text>
        ) : null}
      </View>
    </View>
  );
};
