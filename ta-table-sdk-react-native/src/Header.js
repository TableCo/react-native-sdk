import React, { Component } from 'react'
import {View, Text,Image, TouchableOpacity} from 'react-native';

export default class Header extends Component {
    render() {
        const { isLeftIcon, isRightIcon, headerTitle, onRightIconPress, onLeftIconPress  } = this.props;
        return (
            <View style={{ flexDirection: 'row', height: 50, borderBottomColor: '#fff', borderBottomWidth: 1, elevation: 1, alignItems:'center' }}>
      <View style={{ flex: 0.4, alignItems:'center' }}>
        {isLeftIcon ? (     
          <TouchableOpacity onPress={onLeftIconPress}>
            <Image source={require('../img/back.png')} style={{ height: 20, width: 20, resizeMode:'contain' }} />
          </TouchableOpacity>
        ):null}
      </View>
      <View style={{flex:2, alignItems:'center'}}>
      <Text style={{ color: '#202425', fontSize:16, fontWeight:'bold' }}>{headerTitle}</Text>
      </View>
      <View style={{ flex: 0.4, alignItems:'center' }}>
        {isRightIcon ? (
          <TouchableOpacity onPress={onRightIconPress}>
            <Image source={require('../img/setting.png')} style={{ height: 20, width: 20, resizeMode:'contain' }} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
        )
    }
}
