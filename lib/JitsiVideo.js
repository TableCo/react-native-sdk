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
    console.log(props);
    super(props);
    this.onConferenceTerminated = this.onConferenceTerminated.bind(this);
    this.onConferenceJoined = this.onConferenceJoined.bind(this);
    this.onConferenceWillJoin = this.onConferenceWillJoin.bind(this);
    this.state = {
      user: props.user,
      jwt: props.jwt,
      tenant: props.tenant,
      room: props.room,
    };
  }

  componentDidMount() {
    const url = `${this.state.tenant}/${this.state.room}`; // can also be only room name and will connect to jitsi meet servers
    const userInfo = {
      displayName: this.state.user.firstName
        ? this.state.user.firstName
        : 'Anonymous',
      email: this.state.user.email ? this.state.user.email : 'anon@test.com',
      avatar: this.state.avatar_url ? this.state.user.avatar_url : '',
      token: this.state.jwt,
    };
    JitsiMeet.call(url, userInfo);
    /* You can also use JitsiMeet.audioCall(url) for audio only call */
    /* You can programmatically end the call with JitsiMeet.endCall() */
  }

  onConferenceTerminated(nativeEvent) {
    this.props.navigator.pop();
  }

  onConferenceJoined(nativeEvent) {
    /* Conference joined event */
  }

  onConferenceWillJoin(nativeEvent) {
    /* Conference will join event */
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
