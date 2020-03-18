import React, {Component} from 'react';
import {View, Text,Image, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';
import Header from './Header';
import API from './API';

const WEBVIEW_REF = 'webview'
const ALL_CONVERSATIONS = 'All Conversations'

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
      initialUrl: '',
      headerTitle: ALL_CONVERSATIONS
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
        this.setState({ 
          asyncData: asyncData,
          initialUrl: asyncData.user.workspaceUrl + 'conversation'
        }); 
      }
    });
  };

  getAPIKey = async (asyncData) => {
    const apiKey = await API.getAPIKey(asyncData.user.workspaceUrl)
    if (apiKey) {
      this.setState({apiKey: apiKey})
    }
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

  onNavigationStateChange = async (navState) => {
    console.log("Navigation state", navState)

    try {
      this.checkUrlForHeaderTitle(navState.url)
    } catch (err) {
      console.log("Error getting conversation title", err)
    }

    this.setState({
      urlpage: navState.url,
      backButtonEnabled: navState.canGoBack,
    })
  }

  checkUrlForHeaderTitle = async (url) => {
    const tableId = url.substring(url.lastIndexOf('/') + 1)

    if (url && url.includes('/conversation/') 
        && tableId && tableId != '' && tableId.length == 36) 
    {
      const tableId = url.substring(url.lastIndexOf('/') + 1)
      if (tableId && tableId != '') {
        console.log("Getting conversation title for ", tableId)

        const title = await API.getConversationTitleFromApi(global.workspaceUrl, tableId, this.state.asyncData.user.token)
        if (title && title != "") {
          this.setState({
            headerTitle: title
          })
        }
      }
    } else {
      this.setState({
        headerTitle: ALL_CONVERSATIONS
      })
    }
  }

  goForward = () => {
    this.refs[WEBVIEW_REF].goForward();
  };

  goBack = () => {
    this.refs[WEBVIEW_REF].goBack();
  };

  startComm = (navigation) => {
    this.setState({
      initialUrl: this.state.asyncData.user.workspaceUrl + 'conversation/create'
    })
  }

  render() {
    const {asyncData, headerTitle, initialUrl} = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Header
          isLeftIcon={true}
          isRightIcon={true}
          onLeftIconPress={() => this.onHeaderLeftIconPress(this.props.navigation)}
          headerTitle={headerTitle}
          onRightIconPress={() => this.startComm(this.props.navigation)}
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
              uri: initialUrl,
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