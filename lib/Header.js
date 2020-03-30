import React, { Component } from 'react'
import {View, Text,Image, TouchableOpacity, StyleSheet} from 'react-native';

export default class Header extends Component {
    render() {
        const { isLeftIcon, isRightIcon, headerTitle, onRightIconPress, onLeftIconPress } = this.props;
        return (
          <View style={styles.container} backgroundColor={global.backgroundColor}>
            <View style={styles.sideView}>
              {isLeftIcon ? (
                <TouchableOpacity onPress={onLeftIconPress}>
                  <Image
                    source={require('../img/menu.png')}
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
                    source={require('../img/search.png')}
                    style={styles.iconContainer}
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
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
