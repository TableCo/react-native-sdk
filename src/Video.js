import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';

export class Video extends Component {
  constructor(props) {
    super(props);
    var data = props.navigation.state.params;
    this.state = {
      data: data,
      cameraPosition: 'back',
    };
  }

  static navigationOptions = ({navigation}) => {
    return {
      header: null,
    };
  };

  cancelAndBack() {
    this.props.navigation.goBack();
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
            <TouchableOpacity
              style={styles.flipCamera}
              onPress={() => this.toggleCamera()}>
              <Image
                source={require('../img/flip_camera.png')}
                style={{height: 62, width: 62}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancel}
              onPress={() => this.cancelAndBack()}>
              <Image
                source={require('../img/phone.png')}
                style={{height: 62, width: 62}}
              />
            </TouchableOpacity>
          </View>
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
    backgroundColor: 'black',
  },

  btnContainer: {
    position: 'absolute',
    bottom: 20,
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
