import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {OTSession, OTPublisher,OTSubscriber} from 'opentok-react-native';

export class Video extends Component {
  constructor(props) {
    super(props);
    var data = props.navigation.state.params;
    this.state={data:data}
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header:null
    };
  };
  render() {
    const {data} = this.state;

    return (
      <View style={styles.Wrapper}>
        <OTSession
          apiKey={data.apiKey} //currently set static , It will be set dynamic 
          sessionId={data.sessionId}
          token={data.token}>
          <OTSubscriber style={{flex: 1}} />
          <OTPublisher style={{height: 150,width:100}} />
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
