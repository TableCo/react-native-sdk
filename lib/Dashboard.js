import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
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
      token: '',
      headerTitle: ALL_CONVERSATIONS,
      blockUi: false
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
        // console.log("*** Did mount, incoming token" + asyncData.user.token)
        this.setState({
          asyncData: asyncData,
          initialUrl: asyncData.user.workspaceUrl + 'conversation',
          token: asyncData.user.token
        });
      }
    });
  }

  getAPIKey = async (asyncData) => {
    const apiKey = await API.getApiKey(asyncData.user.workspaceUrl)
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
        && tableId && tableId !== '' && tableId.length === 36)
    {
      const tableId = url.substring(url.lastIndexOf('/') + 1)
      if (tableId && tableId !== '') {
        console.log("Getting conversation title for ", tableId)

        const title = await API.getConversationTitleFromApi(global.workspaceUrl, tableId, this.state.asyncData.user.token)
        if (title && title !== "") {
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

  onNewConversation = async (navigation) => {
    try {
      this.setState({blockUi: true})

      let newConversationId = await API.createConversation(this.state.asyncData.user.workspaceUrl, this.state.asyncData.user.token)
      console.log("Created new conversation ", newConversationId)

      this.setState({
        initialUrl: this.state.asyncData.user.workspaceUrl + 'conversation/' + newConversationId,
        blockUi: false
      })
    }
    catch (err) {
      console.log("Error creating conversation", err)
      this.setState({blockUi: false})
      alert("There was an error starting the conversation")
    }
  }

  render() {
    const {asyncData, headerTitle, initialUrl, blockUi, token} = this.state;
    return (
        <View style={{ flex: 1 }}>
          <Header
              isLeftIcon={true}
              isRightIcon={true}
              onLeftIconPress={() => this.onHeaderLeftIconPress(this.props.navigation)}
              headerTitle={headerTitle}
              onRightIconPress={() => this.onNewConversation(this.props.navigation)}
          />
          {asyncData?(<WebView
              ref={WEBVIEW_REF}
              javaScriptEnabled={true}
              onNavigationStateChange={this.onNavigationStateChange}
              injectedJavaScript={
                'window.localStorage.setItem("authToken", "' +
                token +
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
          {blockUi?(
              <View style={styles.overlay}>
                <View style={styles.overlayBox}>
                  <Text style={styles.overlayText}>Creating Conversation...</Text>
                </View>
              </View>
          ):null}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlayBox: {
    backgroundColor: 'white'
  },
  overlayText: {
    marginTop: 10,
    marginBottom: 10,
    marginStart: 15,
    marginEnd: 15,
    color: '#202425',
    fontSize: 16
  },
})