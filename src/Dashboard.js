import React, {Component} from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';
import PublisherModal from './PublisherModal';
import ViewerModal from './ViewerModal';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asyncData: null,
      sessionID: null,
      tokenID: null,

      publisherModalVisible: false,
      ViewerModal:false,
      isWebView:true
    };
  }

  componentDidMount = async () => {
    AsyncStorage.getItem('data').then(res => {
      let asyncData = JSON.parse(res);
      this.setState({asyncData: asyncData});
    });
  };

  async videoCall(videoData) {
    console.log(JSON.stringify(videoData))
    await this.setState({sessionID: videoData.sessionId, tokenID: videoData.token}, () => {
       setTimeout(() => {
         this.setState({
           publisherModalVisible: true,
           isWebView: false,
           ViewerModal:true
         });
       }, 500);
     });
  }

  render() {
    const {
      asyncData,
      isWebView,
      publisherModalVisible,
      ViewerModal,sessionID,
      tokenID,
    } = this.state;
    return (
      <View style={{flex: 1}}>
        {asyncData && isWebView ? (
          <WebView
            ref="webview"
            javaScriptEnabled={true}
            injectedJavaScript={
              'window.localStorage.setItem("authToken", "' +
              asyncData.user.token +
              '")'
            }
            source={{
              uri: asyncData.user.workspaceUrl + 'table',
            }}
            onMessage={event => {
              var videoData = JSON.parse(event.nativeEvent.data);
              this.videoCall(videoData);
            }}
          />
        ) : null}

        {publisherModalVisible ? (
          <PublisherModal
            onPress={() =>
              this.setState({isWebView: true, publisherModalVisible: false})
            }
            sessionId={sessionID}
            token={tokenID}
          />
        ) : null}

        {/* {ViewerModal ? (
          <ViewerModal
            onPress={() => this.setState({isWebView: true, ViewerModal: false})}
            sessionId={sessionID}
            token={tokenID}
          />
        ) : null} */}
      </View>
    );
  }
}
