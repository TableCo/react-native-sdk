import React, {Component} from 'react';
import {View, Text,Image, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';
import Header from './Header';


var WEBVIEW_REF = 'webview';
var START_COMM = 'https://develop3.dev.table.co/conversation/create';

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

  onHeaderLeftIconPress = (navigation) => {
    const {urlpage, backButtonEnabled} = this.state

    console.log(`Header left icon pressed ${urlpage} enabled ${backButtonEnabled}`)

    if (backButtonEnabled) {
      this.goBack()
    } else {
      this.props.navigation.navigate('Welcome')
    }
  }

  onNavigationStateChange = (navState) => {
    console.log("Nav state", navState)

    console.log("HERE hello ")

    if (navState.hasOwnProperty('title')) {
        console.log(" has title")
    }

    // On viewing a conversation call the API and set the title properly
    // https://develop3.dev.table.co/conversation/c34ed657-341b-4be2-a08a-4e575b363b7e

    this.setState({
      urlpage: navState.url,
      backButtonEnabled: navState.canGoBack,
    });
  };

  goForward = () => {
    this.refs[WEBVIEW_REF].goForward();
  };

  goBack = () => {
    this.refs[WEBVIEW_REF].goBack();
  };


  startComm = (navigation) => {
    
    //this.refs[WEBVIEW_REF] 
  }


  render() {
    const {asyncData} = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Header
          isLeftIcon={true}
          isRightIcon={true}
          onLeftIconPress={() => this.onHeaderLeftIconPress(this.props.navigation)}
          onRightIconPress={() => this.startComm(this.props.navigation)}
          headerTitle={'All Conversations'}
        />
        {asyncData?(<WebView
            ref={WEBVIEW_REF}
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