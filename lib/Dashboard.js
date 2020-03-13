import React, {Component} from 'react';
import {View, Text,Image, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';
import Header from './Header';
import { NavigationActions } from 'react-navigation';


var WEBVIEW_REF = 'webview';


export class Dashboard extends Component {

  urlPage = ""
  backButtonEnabled = false

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

    this.setState({
      urlpage: navState.url,
      backButtonEnabled: navState.canGoBack,
    });

    this.urlPage = navState.urlPage
    this.backButtonEnabled = navState.backButtonEnabled
  };

  goForward = () => {
    this.refs[WEBVIEW_REF].goForward();
  };

  goBack = () => {
    this.refs[WEBVIEW_REF].goBack();
  };

  render() {
    // this.props.navigation.dispatch(NavigationActions.back())
    const {asyncData, onLeftIconPress} = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Header
          isLeftIcon={true}
          // onLeftIconPress={()=>this.props.navigation.navigate('Welcome')}
          onLeftIconPress={() => this.onHeaderLeftIconPress(this.props.navigation)}
          headerTitle={'All Conversations'}
        />
        {asyncData?(<WebView
            ref={WEBVIEW_REF}
            javaScriptEnabled={true}
            onNavigationStateChange={this.onNavigationStateChange}
            onLoadEnd={() => console.log("WebView onLoadEnd")}
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