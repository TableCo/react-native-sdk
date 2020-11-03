import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';

export class Video extends Component {
  constructor(props) {
    super(props);
    const data = props.videoData;
    this.state = {
      data: data,
      cameraPosition: 'back',
    };
  }

  cancelAndBack() {
    this.props.navigator.pop();
  }

  toggleCamera() {
    const {cameraPosition} = this.state;
    if (cameraPosition === 'back') {
      this.setState({
        cameraPosition: 'front',
      });
    } else {
      this.setState({
        cameraPosition: 'back',
      });
    }
  }

  render() {
    const {data} = this.state;
    return (
      <View style={styles.Wrapper}>
        <OTSession
          apiKey={data.apiKey}
          sessionId={data.sessionId}
          token={data.token}>
          <OTSubscriber style={{flex: 1}} />
          <OTPublisher
            style={{height: 150, width: 100}}
            properties={{cameraPosition: this.state.cameraPosition}}
          />
          <View style={styles.btnContainer}>
            <ButtonView
              onPress={() => this.toggleCamera()}
              source={require('../img/flip_camera.png')}
              btnLabel={'Flip Camera'}
            />

            <ButtonView
              onPress={() => this.cancelAndBack()}
              source={require('../img/phone.png')}
              btnLabel={'End Call'}
            />
          </View>
        </OTSession>
      </View>
    );
  }
}

export const ButtonView = (props) => {
  return (
    <View style={{alignItems: 'center', marginHorizontal: 15}}>
      <TouchableOpacity style={styles.cancel} onPress={props.onPress}>
        <Image source={props.source} style={{height: 62, width: 62}} />
      </TouchableOpacity>
      <Text style={{color: 'white', marginTop: 10}}>{props.btnLabel}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    display: 'flex',
  },
  Wrapper: {
    flex: 1,
    backgroundColor: 'black',
  },

  btnContainer: {
    position: 'absolute',
    bottom: '8%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
  },

  flipCamera: {
    margin: 10,
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  cancel: {
    margin: 10,
    borderRadius: 30,
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

// import React, {useEffect} from 'react';
// import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
// import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';
// import JitsiMeet, {JitsiMeetView} from 'react-native-jitsi-meet';

// const Video = () => {
//   useEffect(() => {
//     setTimeout(() => {
//       const url = 'https://meet.jit.si/exemple';
//       const userInfo = {
//         displayName: 'User',
//         email: 'user@example.com',
//         avatar: 'https:/gravatar.com/avatar/abc123',
//       };
//       JitsiMeet.call(url, userInfo);
//       /* Você também pode usar o JitsiMeet.audioCall (url) para chamadas apenas de áudio */
//       /* Você pode terminar programaticamente a chamada com JitsiMeet.endCall () */
//     }, 1000);
//   }, []);

//   useEffect(() => {
//     return () => {
//       JitsiMeet.endCall();
//     };
//   });

//   function onConferenceTerminated(nativeEvent) {
//     /* Conference terminated event */
//     console.log(nativeEvent);
//   }

//   function onConferenceJoined(nativeEvent) {
//     /* Conference joined event */
//     console.log(nativeEvent);
//   }

//   function onConferenceWillJoin(nativeEvent) {
//     /* Conference will join event */
//     console.log(nativeEvent);
//   }
//   return (
//     <JitsiMeetView
//       onConferenceTerminated={(e) => onConferenceTerminated(e)}
//       onConferenceJoined={(e) => onConferenceJoined(e)}
//       onConferenceWillJoin={(e) => onConferenceWillJoin(e)}
//       style={{
//         flex: 1,
//         height: '100%',
//         width: '100%',
//       }}
//     />
//   );
//   //   constructor(props) {
//   //     super(props);
//   //     const data = props.videoData;
//   //     this.state = {
//   //       data: data,
//   //       cameraPosition: 'back',
//   //     };
//   //     this.onConferenceTerminated = this.onConferenceTerminated.bind(this);
//   //     this.onConferenceJoined = this.onConferenceJoined.bind(this);
//   //     this.onConferenceWillJoin = this.onConferenceWillJoin.bind(this);
//   //   }

//   //   cancelAndBack() {
//   //     this.props.navigator.pop();
//   //   }

//   //   toggleCamera() {
//   //     const {cameraPosition} = this.state;
//   //     if (cameraPosition === 'back') {
//   //       this.setState({
//   //         cameraPosition: 'front',
//   //       });
//   //     } else {
//   //       this.setState({
//   //         cameraPosition: 'back',
//   //       });
//   //     }
//   //   }

//   //   componentDidMount() {
//   //     setTimeout(() => {
//   //       const url = self.props.navigation.getParam('url');
//   //       const userInfo = {
//   //         displayName: 'User',
//   //         email: 'user@example.com',
//   //         avatar: 'https:/gravatar.com/avatar/abc123',
//   //       };
//   //       JitsiMeet.call(url, userInfo);
//   //       /* You can also use JitsiMeet.audioCall(url) for audio only call */
//   //       /* You can programmatically end the call with JitsiMeet.endCall() */
//   //     }, 1000);
//   //   }

//   //   onConferenceTerminated(nativeEvent) {
//   //     /* Conference terminated event */
//   //   }

//   //   onConferenceJoined(nativeEvent) {
//   //     /* Conference joined event */
//   //   }

//   //   onConferenceWillJoin(nativeEvent) {
//   //     /* Conference will join event */
//   //   }
//   //   render() {
//   //     const {data} = this.state;
//   //     return (
//   //       <View style={styles.Wrapper}>
//   //         {/* <OTSession
//   //                     apiKey={data.apiKey}
//   //                     sessionId={data.sessionId}
//   //                     token={data.token}>
//   //                     <OTSubscriber style={{flex: 1}}/>
//   //                     <OTPublisher style={{height: 150, width: 100}}
//   //                                  properties={{cameraPosition: this.state.cameraPosition}}/>
//   //                     <View style={styles.btnContainer}>

//   //                         <ButtonView
//   //                             onPress={() => this.toggleCamera()}
//   //                             source={require('../img/flip_camera.png')}
//   //                             btnLabel={'Flip Camera'}/>

//   //                         <ButtonView
//   //                             onPress={() => this.cancelAndBack()}
//   //                             source={require('../img/phone.png')}
//   //                             btnLabel={'End Call'}/>
//   //                     </View>
//   //                 </OTSession> */}
//   //         <JitsiMeetView
//   //           onConferenceTerminated={this.onConferenceTerminated}
//   //           onConferenceJoined={this.onConferenceJoined}
//   //           onConferenceWillJoin={this.onConferenceWillJoin}
//   //           style={{flex: 1, height: '100%', width: '100%'}}
//   //         />
//   //       </View>
//   //     );
//   //   }
//   // }

//   // export const ButtonView = (props) => {
//   //   return (
//   //     <View style={{alignItems: 'center', marginHorizontal: 15}}>
//   //       <TouchableOpacity style={styles.cancel} onPress={props.onPress}>
//   //         <Image source={props.source} style={{height: 62, width: 62}} />
//   //       </TouchableOpacity>
//   //       <Text style={{color: 'white', marginTop: 10}}>{props.btnLabel}</Text>
//   //     </View>
//   //   );
//   // };

//   // const styles = StyleSheet.create({
//   //   modalBackground: {
//   //     flex: 1,
//   //     alignItems: 'center',
//   //     justifyContent: 'center',
//   //     margin: 0,
//   //     display: 'flex',
//   //   },
//   //   Wrapper: {
//   //     flex: 1,
//   //     backgroundColor: 'black',
//   //   },

//   //   btnContainer: {
//   //     position: 'absolute',
//   //     bottom: '8%',
//   //     flexDirection: 'row',
//   //     justifyContent: 'space-around',
//   //     alignSelf: 'center',
//   //   },

//   //   flipCamera: {
//   //     margin: 10,
//   //     height: 60,
//   //     width: 60,
//   //     borderRadius: 30,
//   //     alignItems: 'center',
//   //     justifyContent: 'center',
//   //     backgroundColor: 'white',
//   //   },

//   //   cancel: {
//   //     margin: 10,
//   //     borderRadius: 30,
//   //     height: 60,
//   //     width: 60,
//   //     alignItems: 'center',
//   //     justifyContent: 'center',
//   //     backgroundColor: 'white',
//   //   },
// };

// export default Video;
