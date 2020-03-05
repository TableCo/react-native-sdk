import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {OTSession, OTPublisher} from 'opentok-react-native';

export default class PublisherModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {visible, onRequestClose, onPress, sessionId, token} = this.props;

    return (
      <View style={styles.Wrapper}>
        <Text onPress={onPress} style={{padding:10,borderColor:'green',borderWidth:1,alignSelf:'center',borderRadius:8}}>{'close'}</Text>
        <OTSession
          apiKey={'46053512'} //currently set static , It will be set dynamic 
          sessionId={sessionId}
          token={token}>
          <OTPublisher style={{flex: 1}} />
        </OTSession>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    display: 'flex',
  },
  Wrapper: {
    flex:1
  },
});
