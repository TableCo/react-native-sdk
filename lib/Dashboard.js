import React, {Component, Fragment} from 'react';
import {View, Text, StyleSheet, BackHandler, SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';
import Header from './Header';
import API from './API';

const ALL_CONVERSATIONS = 'All Conversations';

export class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      asyncData: null,
      sessionID: null,
      tokenID: null,

      publisherModalVisible: false,
      ViewerModal: false,
      isWebView: true,
      newMessageButtonEnabled: true,
      backButtonNavigatesBrowser: true,
      apiKey: '',
      webViewUrl: '',
      initialUrl: '',
      token: '',
      headerTitle: ALL_CONVERSATIONS,
      blockUi: false,
      initialBack: false,
    };
  }

  componentDidMount = async () => {
    // Override the Android back button so that we can navigate the web view if required
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.onHeaderLeftIconOrBackNav(null);
      return true;
    });

    AsyncStorage.getItem('data').then((res) => {
      let asyncData = JSON.parse(res);
      if (asyncData) {
        let url =
          asyncData.user.workspaceUrl +
          'conversation?token=' +
          asyncData.user.token;
        API.getTable(
          asyncData.user.workspaceUrl,
          asyncData.user.token,
          global.experienceShortCode,
        )
          .then((table) => {
            if (table) {
              url =
                asyncData.user.workspaceUrl +
                'conversation/' +
                table +
                '?token=' +
                asyncData.user.token;
              this.setState({
                initialBack: true,
              });
            } else {
              if (this.props.conversationId) {
                url =
                  asyncData.user.workspaceUrl +
                  'conversation/' +
                  this.props.conversationId;
              }
            }
          })
          .catch((e) => {
            if (this.props.conversationId) {
              url =
                asyncData.user.workspaceUrl +
                'conversation/' +
                this.props.conversationId;
            }
          });
        this.setState({
          asyncData: asyncData,
          webViewUrl: url,
          initialUrl: url,
          token: asyncData.user.token,
        });
      }
    });
  };

  componentWillUnmount() {
    this.backHandler.remove();
  }

  onHeaderLeftIconOrBackNav = () => {
    const {backButtonNavigatesBrowser, initialBack} = this.state;
    if (backButtonNavigatesBrowser || initialBack) {
      this.goBack();
    } else {
      this.props.onFinished();
    }
  };

  /**
   * The real nav state change from the WebView, but doesn't always get called
   * @see https://github.com/react-native-community/react-native-webview/issues/24
   */
  onNavigationStateChange = async (navState) => {
    try {
      this.checkUrlForHeaderTitle(navState.url);
    } catch (err) {
      console.log('Error getting conversation title', err);
    }

    const newMessageEnabled = navState.url === this.state.initialUrl;

    this.setState({
      urlpage: navState.url,
      backButtonNavigatesBrowser: navState.canGoBack,
      newMessageButtonEnabled: newMessageEnabled,
    });
  };

  /**
   * The callback from the injected javascript event listener
   * @param url passed from the injected javascript listener
   */
  onLocationChange = async (url) => {
    try {
      this.checkUrlForHeaderTitle(url);
    } catch (err) {
      console.log('Error getting conversation title', err);
    }

    const newMessageEnabled = url === this.state.initialUrl;

    this.setState({
      urlpage: url,
      backButtonNavigatesBrowser: !newMessageEnabled, // As we can't get canGoBack from the nav state infer this from the URL
      newMessageButtonEnabled: newMessageEnabled,
    });
  };

  checkUrlForHeaderTitle = async (url) => {
    const tableId = url.substring(url.lastIndexOf('/') + 1);

    if (
      url &&
      url.includes('/conversation/') &&
      tableId &&
      tableId !== '' &&
      tableId.length === 36
    ) {
      const tableId = url.substring(url.lastIndexOf('/') + 1);
      if (tableId && tableId !== '') {
        const title = await API.getConversationTitleFromApi(
          global.workspaceUrl,
          tableId,
          this.state.asyncData.user.token,
        );
        if (title && title !== '') {
          this.setState({
            headerTitle: title,
          });
        }
      }
    } else {
      this.setState({
        headerTitle: ALL_CONVERSATIONS,
      });
    }
  };

  goForward = () => {
    this.webview.goForward();
  };

  goBack = () => {
    if (this.state.initialBack) {
      this.setState({
        webViewUrl: this.state.asyncData.user.workspaceUrl + 'conversation/',
        initialBack: false,
      });
    }
    this.webview.goBack();
  };

  onNewConversation = async (navigator) => {
    try {
      this.setState({blockUi: true});

      let newConversationId = await API.createConversation(
        this.state.asyncData.user.workspaceUrl,
        this.state.asyncData.user.token,
        global.experienceShortCode,
      );
      console.log('Created new conversation ', newConversationId);

      this.setState({
        webViewUrl:
          this.state.asyncData.user.workspaceUrl +
          'conversation/' +
          newConversationId,
        blockUi: false,
      });
    } catch (err) {
      console.log('Error creating conversation', err);
      this.setState({blockUi: false});
      alert('There was an error starting the conversation');
    }
  };

  onHangup = () => {
    this.webview.injectJavaScript(`window.TableCommand('jitsi-hangup', 1)`);
  };

  render() {
    const {
      asyncData,
      headerTitle,
      webViewUrl,
      blockUi,
      token,
      newMessageButtonEnabled,
    } = this.state;

    const injectedJS = `
      (function() {
        function wrap(fn) {
          return function wrapper() {
            var res = fn.apply(this, arguments);
            window.ReactNativeWebView.postMessage(window.location.href);
            return res;
          }
        }
  
        history.pushState = wrap(history.pushState);
        history.replaceState = wrap(history.replaceState);
        window.addEventListener('popstate', function() {
          window.ReactNativeWebView.postMessage(window.location.href);
        });
      })();
  
      true;
      `;
    // React >= 16.2.0 required for Fragment support
    return (
      <Fragment>
        <SafeAreaView
          style={styles.safeAreaTop}
          backgroundColor={global.backgroundColor}
        />
        <SafeAreaView style={styles.safeAreaBottom}>
          <Header
            isLeftIcon={true}
            isRightIcon={newMessageButtonEnabled}
            onLeftIconPress={() =>
              this.onHeaderLeftIconOrBackNav(this.props.navigator)
            }
            headerTitle={headerTitle}
            onRightIconPress={() =>
              this.onNewConversation(this.props.navigator)
            }
          />
          {asyncData ? (
            <WebView
              ref={(ref) => (this.webview = ref)}
              javaScriptEnabled={true}
              onNavigationStateChange={this.onNavigationStateChange}
              injectedJavaScript={injectedJS}
              source={{
                uri: webViewUrl,
              }}
              onMessage={(event) => {
                console.log('message intercepted');
                console.log(event.nativeEvent.data);
                if (event.nativeEvent.data.startsWith('https')) {
                  this.onLocationChange(event.nativeEvent.data);
                } else {
                  var data = JSON.parse(event.nativeEvent.data);
                  if (data.jwt) {
                    this.props.navigator.push('JitsiVideo', {
                      user: this.state.asyncData.user,
                      jwt: data.jwt,
                      tenant: data.tenant,
                      room: data.room,
                      server: data.server,
                      onHangup: this.onHangup,
                    });
                  }
                }
              }}
            />
          ) : null}
          {blockUi ? (
            <View style={styles.overlay}>
              <View style={styles.overlayBox}>
                <Text style={styles.overlayText}>Creating Conversation...</Text>
              </View>
            </View>
          ) : null}
        </SafeAreaView>
      </Fragment>
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
    alignItems: 'center',
  },
  overlayBox: {
    backgroundColor: 'white',
  },
  overlayText: {
    marginTop: 10,
    marginBottom: 10,
    marginStart: 15,
    marginEnd: 15,
    color: '#202425',
    fontSize: 16,
  },
  safeAreaBottom: {
    flex: 1,
    backgroundColor: 'rgba(247,248,249,0.4)',
  },
  safeAreaTop: {
    flex: 0,
  },
});
