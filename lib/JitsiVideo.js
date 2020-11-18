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
    const url = `https://8x8.vc/${this.state.tenant}/${this.state.room}?jwt=${this.state.jwt}`;
    console.log(url); // can also be only room name and will connect to jitsi meet servers
    const userInfo = {
      displayName: this.state.user.firstName
        ? this.state.user.firstName
        : 'Anonymous',
      email: this.state.user.email ? this.state.user.email : 'anon@test.com',
      avatar: this.state.avatar_url ? this.state.user.avatar_url : '',
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
