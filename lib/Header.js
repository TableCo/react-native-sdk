import React, { Component } from 'react'
import {View, Text,Image, TouchableOpacity,StyleSheet} from 'react-native';

export default class Header extends Component {
    render() {
        const { isLeftIcon, isRightIcon, headerTitle, onRightIconPress, onLeftIconPress  } = this.props;
        return (
          <View style={styles.container}>
            <View style={styles.sideView}>
              {isLeftIcon ? (
                <TouchableOpacity onPress={onLeftIconPress}>
                  <Image
                    source={require('../img/back.png')}
                    style={styles.iconContainer}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={styles.headerView}>
              <Text style={styles.headerText}>{headerTitle}</Text>
            </View>
            <View style={styles.sideView}>
              {isRightIcon ? (
                <TouchableOpacity onPress={onRightIconPress}>
                  <Image
                    source={require('../img/pencilpad.png')}
                    style={styles.iconContainerOpaque}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    elevation: 1,
    alignItems: 'center',
  },

  sideView: {
    flex: 0.4,
    alignItems: 'center',
  },

    iconContainerOpaque: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        opacity: 0.6
    },

  iconContainer: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },

  headerView: {
    flex: 2,
    alignItems: 'center',
  },

  headerText: {
    color: '#202425',
    fontSize: 16,
    fontWeight: 'bold',
  },
});