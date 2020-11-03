// import React, {useEffect} from 'react';
// import JitsiMeet, {JitsiMeetView} from 'react-native-jitsi-meet';

// function JitsiVideo() {
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
// }
// export default JitsiVideo;
import React from 'react';
import {View, Alert} from 'react-native';
import JitsiMeet, {JitsiMeetView} from 'react-native-jitsi-meet';

class JitsiVideo extends React.Component {
  constructor(props) {
    super(props);
    this.onConferenceTerminated = this.onConferenceTerminated.bind(this);
    this.onConferenceJoined = this.onConferenceJoined.bind(this);
    this.onConferenceWillJoin = this.onConferenceWillJoin.bind(this);
  }

  componentDidMount() {
    const url = 'https://meet.jit.si/ForwardRestaurantsPurchaseNormally'; // can also be only room name and will connect to jitsi meet servers
    const userInfo = {
      displayName: 'User',
      email: 'user@example.com',
      avatar: 'https:/gravatar.com/avatar/abc123',
    };
    JitsiMeet.audioCall(url, userInfo);
    /* You can also use JitsiMeet.audioCall(url) for audio only call */
    /* You can programmatically end the call with JitsiMeet.endCall() */
  }

  onConferenceTerminated(nativeEvent) {
    Alert.alert('ended');
  }

  onConferenceJoined(nativeEvent) {
    /* Conference joined event */
    Alert.alert('joined');
  }

  onConferenceWillJoin(nativeEvent) {
    /* Conference will join event */
    Alert.alert('will join');
  }

  render() {
    return (
      <View style={{backgroundColor: 'black', flex: 1}}>
        <JitsiMeetView
          onConferenceTerminated={this.onConferenceTerminated}
          onConferenceJoined={this.onConferenceJoined}
          onConferenceWillJoin={this.onConferenceWillJoin}
          style={{flex: 1, height: '100%', width: '100%'}}
        />
      </View>
    );
  }
}

export default JitsiVideo;
