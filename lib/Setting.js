import React, {Component} from 'react';
import {View, Text, TouchableOpacity,} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Header from './Header';
import PackageJson from './../../../package.json';

export  class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {}
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header:null
    };
  };

  componentDidMount = () => {
    AsyncStorage.getItem('data').then(res => {
      this.setState({ userData: JSON.parse(res).user })
    })
  };

  onLogoutPress() {
    AsyncStorage.removeItem('data').then(resp => {
      this.props.navigation.navigate('Welcome')
    });
  }

  getWorkspace = (workspace) => {
  var res = workspace.substr(workspace.indexOf(':')+3, workspace.indexOf('table')-9);
    return res;
  }

  render() {  
    const { userData } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Header
          isLeftIcon={true}          
          headerTitle={'Account Settings'}
          //onLeftIconPress={()=>this.props.navigation.goBack()}
          onLeftIconPress={()=>this.props.navigation.goBack(null)}
        />

        <ItemText title={'Name'} itemName={userData.first_name+" "+userData.last_name} />

        <ItemText
          title={'Workspace'}
          itemName={this.getWorkspace(""+userData.workspaceUrl)}
          endPointUrl={'.table.co'}
        />

        <ItemText title={'App Version'} itemName={PackageJson.version} />

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
