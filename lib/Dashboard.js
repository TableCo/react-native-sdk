import React, {Component} from 'react';
import {View, Text,Image, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';
import Header from './Header';

export class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      asyncData: null,
      sessionID: null,
      tokenID: null,

      publisherModalVisible: false,
      ViewerModal: false,
      isWebView: true,
      apiKey:"",
      urlpage: ""
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header:null
    };
  };

  componentDidMount = async () => {
    AsyncStorage.getItem('data').then(res => {
      let asyncData = JSON.parse(res);
      if (asyncData) {
        this.getAPIKey(asyncData)
        this.setState({ asyncData: asyncData }); 
      }
    });
  };

  getAPIKey = (asyncData) => {
    fetch(asyncData.user.workspaceUrl + 'installation-service/installation/opentok-api-key' , {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
      .then(response => response.json())
      .then(responseJSON => {
        this.setState({apiKey:responseJSON.opentok_api_key.toString()})
      })
      .catch(error => {
        reject(error);
      });
  }

  videoCall(videoData) {
    this.setState({ sessionID: videoData.sessionId, tokenID: videoData.token });
    videoData.apiKey = this.state.apiKey;
    this.props.navigation.navigate("Video", videoData)
  }



  onNavigationStateChange = (navState) => {
    this.setState({
      urlpage: navState.url,
    });
  };


  render() {
    const {asyncData, onLeftIconPress} = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Header
          isLeftIcon={true}
          onLeftIconPress={()=>this.props.navigation.navigate('TableScreen')}
          headerTitle={'All Conversations'}
        />
        {asyncData?(<WebView
            ref="webview"
            javaScriptEnabled={true}
            onNavigationStateChange={this.onNavigationStateChange}
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
          />):null}
      </View>
    );
  }
}