import React, {Component} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import Modal from 'react-native-modal';

import OpenTok, {Publisher, Subscriber} from 'react-native-opentok';

const sessionId = '2_MX40NjA1MzUxMn5-MTU4MzMzODI0NDMyNH5MN3BXYkpoYUpXTjNleFNpaHMrM05IOVN-fg';
const token = 'T1==cGFydG5lcl9pZD00NjA1MzUxMiZzaWc9M2YzMDQ1MzBiZjc3NDM4NjU2NWFkYjNkOGM4YzUwMGE3YjA5ZGJkYjpzZXNzaW9uX2lkPTFfTVg0ME5qQTFNelV4TW41LU1UVTRNek16T1RJMU9UZzVPSDRyUkRkcGNreDZUM1ZST0VOeEszVmxVVGMzYnpWblZEWi1mZyZjcmVhdGVfdGltZT0xNTgzMzM5MjYwJmV4cGlyZV90aW1lPTE1ODM0MjU2NjAmcm9sZT1wdWJsaXNoZXImbm9uY2U9MzY5MzQxJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';

var { width, height } = Dimensions.get('window');

export default class PublisherModal extends Component<{}> {

  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    await OpenTok.connect(this.props.sessionId, this.props.tokenId);
    OpenTok.on(OpenTok.events.ON_SIGNAL_RECEIVED, e => console.log(e));
  }

  ref: Ref<typeof PublisherModal>;

  render() {
    const {visible, onRequestClose, sessionId} = this.props;

    return (
      <Modal
        isVisible={visible}
        animationIn="slideInDown"
        animationOut="slideOutUp"
        backdropOpacity={0}
        onBackButtonPress={onRequestClose}
        onBackdropPress={onRequestClose}
        style={styles.modalBackground}>
        <View style={styles.Wrapper}>
          <View style={{flex: 0.9}}>
            <Publisher
              sessionId={sessionId}
              mute={true}
              onPublishStart={() => {
                alert('Streaming Started');
              }}
              onPublishStop={() => {
                console.log('Streaming Stopped');
              }}
              onPublishError={() => {
                console.log('Streaming Error');
              }}
              style={{backgroundColor: 'black', height: height, width: width}}
              ref={ref => {
                this.ref = ref;
              }}
            />
          </View>
        </View>
      </Modal>
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
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    display: 'flex',
    // top: Platform.OS === 'ios' ? 120 : 82,
    // position: 'absolute',
    overflow: 'hidden',
  },
});
