import React, {Component} from 'react';
import {View, Text,Image, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';
import Header from './Header';


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
      urlpage: "",
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

  onNavigationStateChange = async (navState) => {
    // console.log("Nav state", navState)

    try {
      this.checkUrlForHeaderTitle(navState.url)
    } catch (err) {
      console.log("Error getting conversation title", err)
    }

    this.setState({
      urlpage: navState.url,
      backButtonEnabled: navState.canGoBack,
    });
  };

  checkUrlForHeaderTitle = async (url) => {
    if (url && url.includes('/conversation/')) {
      const tableId = url.substring(url.lastIndexOf('/') + 1)
      if (tableId && tableId != '') {
        console.log("Getting conversation title for ", tableId)

        const title = await this.getConversationTitleFromApi(tableId)
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

  getConversationTitleFromApi = async (tableId) => {
    const url = global.workspaceUrl + 'table-service/table/' + tableId;
    const token = this.state.asyncData.user.token

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
    
    const json = await response.json()
    const tableTitle = json["title"]

    return tableTitle
  }

  goForward = () => {
    this.refs[WEBVIEW_REF].goForward();
  };

  goBack = () => {
    this.refs[WEBVIEW_REF].goBack();
  };

  render() {
    const {asyncData, headerTitle} = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Header
          isLeftIcon={true}
          onLeftIconPress={() => this.onHeaderLeftIconPress(this.props.navigation)}
          headerTitle={headerTitle}
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