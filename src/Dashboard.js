import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';
import PublisherModal from './PublisherModal';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      sessionID: null,
      tokenID: null,

      publisherModalVisible: false,
    };
  }

  componentDidMount = async () => {
    AsyncStorage.getItem('data').then(res => {
      let data = JSON.parse(res);
      this.setState({data: data});
    });
  };

  async videoCall(data) {
    this.setState({ sessionID: data.sessionId, tokenID: data.tokenId }, () => {
      setTimeout(() => {
        this.setState({publisherModalVisible: true});
      }, 500);
    })
  }

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
            onMessage={async event => {
              var data = JSON.parse(event.nativeEvent.data);
              this.setState({
                sessionID: data.sessionId,
                tokenID: data.token,
              });
              this.videoCall(data);
            }}
            source={{
              uri: this.state.data.user.workspaceUrl + 'table',
            }}
          />
        ) : null}

        <PublisherModal
          visible={this.state.publisherModalVisible}
          onRequestClose={() => this.setState({publisherModalVisible: false})}
          sessionId={this.state.sessionID}
          tokenId={this.state.tokenID}
        />
      </View>
    );
  }
}
