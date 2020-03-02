import React, {Component} from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount = async () => {
    AsyncStorage.getItem('data').then(res => {
      let data = JSON.parse(res);
      this.setState({data: data});
    });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.data ? (
          <WebView
            ref="webview"
            javaScriptEnabled={true}
            injectedJavaScript={
              'window.localStorage.setItem("authToken", "' +
              this.state.data.user.token +
              '")'
            }
            source={{
              uri: this.state.data.user.workspaceUrl + 'table',
            }}
          />
        ) : null}
      </View>
    );
  }
}
