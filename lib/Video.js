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
