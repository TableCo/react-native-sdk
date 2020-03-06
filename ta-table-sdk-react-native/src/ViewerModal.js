import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {OTSession, OTSubscriber} from 'opentok-react-native';

export default class ViewerModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {onPress, sessionID, tokenID} = this.props;

    return (
      <View style={styles.Wrapper}>
        <Text onPress={onPress}>{'close'}</Text>

        <OTSession
          apiKey={'46053512'} //currently set static , It will be set dynamic
          sessionId={sessionID}
          token={tokenID}>
          <OTSubscriber style={{width: 100, height: 100}} />
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
    flex: 1,
  },
});
